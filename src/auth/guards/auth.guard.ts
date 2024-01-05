import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../users/user.service';
import { JwtPayload } from '../dto/jwt.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly userService: UserService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') });

      request['user'] = await this.userService.getUser(payload.userId);
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
