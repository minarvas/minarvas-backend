import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Input } from '../graphql/args/input.args';
import { GraphqlContext } from '../graphql/types/graphql-context.type';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserResponse } from '../users/responses/user.response';
import { AuthService } from './auth.service';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { AuthGuard } from './guards/auth.guard';
import { AuthUrlInput } from './inputs/auth.input';
import { AuthUrlResponse } from './responses/auth-url.response';

@Resolver('Auth')
export class AuthResolver {
  private readonly client: string;

  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    this.client = this.configService.get<string>('CLIENT');
  }

  @Query(() => AuthUrlResponse, { description: `Get authorization url for social login` })
  async getAuthUrl(@Input() input: AuthUrlInput) {
    return await this.authService.getAuthUrl(input.provider);
  }

  @Query(() => UserResponse, { description: `Get user information with access-token in request authorization header` })
  @UseGuards(AuthGuard)
  async me(@AuthorizedUser() user: UserResponse) {
    return user;
  }

  @Mutation(() => UserResponse, {
    description: `Refresh access-token and refresh-token with refresh-token in request authorization header.\n 
    You can get new access-token and refresh-token ( Access-Token, Refresh-Token in header ).`,
  })
  async refreshToken(@RefreshToken() refreshToken: string, @Context() context: GraphqlContext) {
    const { jwtToken, user } = await this.authService.refreshToken(refreshToken);
    context.res.header('Access-Token', jwtToken.accessToken);
    context.res.header('Refresh-Token', jwtToken.refreshToken);
    return user;
  }
}
