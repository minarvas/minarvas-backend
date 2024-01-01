import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { CreateSocialUserInput } from '../users/inputs/user.input';
import { UserProvider } from '../users/enums/user-provider.enum';
import { ConfigService } from '@nestjs/config';
import { AuthUrlResponse } from './responses/auth-url.response';

@Injectable()
export class AuthService {
  private kakaoClientId: string;
  private kakaoRedirectUrl: string;

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.kakaoClientId = this.configService.get<string>('KAKAO_CLIENT_ID');
    this.kakaoRedirectUrl = this.configService.get<string>('KAKAO_REDIRECT_URI');
  }

  async socialSignup(payload: CreateSocialUserInput) {
    const isExistUser = await this.userService.isExistUser(payload.email);
    if (isExistUser) {
      return await this.loginSocialUser(payload);
    }

    return await this.registerSocialUser(payload);
  }

  async registerSocialUser(payload: CreateSocialUserInput) {
    const user: User = await this.userService.createSocialUser(payload);
    const accessToken: string = this.jwtService.sign({ id: user.id });
    return { ...user, accessToken };
  }

  async loginSocialUser(payload: CreateSocialUserInput) {
    const user: User = await this.userService.getUserByEmail(payload.email);
    const accessToken: string = this.jwtService.sign({ id: user.id });
    return { ...user, accessToken };
  }

  async getAuthUrl(provider: UserProvider) {
    let url: string = null;

    if (provider === UserProvider.KAKAO)
      url = `https://kauth.kakao.com/oauth/authorize?client_id=${this.kakaoClientId}&redirect_uri=${this.kakaoRedirectUrl}&response_type=code`;

    return new AuthUrlResponse(url);
  }
}
