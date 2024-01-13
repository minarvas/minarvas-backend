import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Input } from '../graphql/args/input.args';
import { UserResponse } from '../users/responses/user.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserService } from '../users/user.service';
import { AuthUrlInput } from './inputs/auth.input';
import { AuthUrlResponse } from './responses/auth-url.response';
import { GraphqlContext } from '../graphql/types/graphql-context.type';
import { RefreshToken } from './decorators/refresh-token.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

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
    description: `Refresh access-token and refresh-token with refresh-tzoken in request authorization header.\n 
    You can get new access-token and refresh-token in response header ( Access-Token, Refresh-Token ).`,
  })
  async refreshToken(@RefreshToken() refreshToken: string, @Context() context: GraphqlContext) {
    const { jwtToken, user } = await this.authService.refreshToken(refreshToken);
    context.res.header('Access-Token', jwtToken.accessToken);
    context.res.cookie('Refresh-Token', jwtToken.refreshToken);
    context.res.header('Access-Control-Expose-Headers', 'Access-Token, Refresh-Token');
    context.res.header('Access-Control-Allow-Credentials', 'true');
    context.res.header('Access-Control-Allow-Origin', 'https://sandbox.embed.apollographql.com');
    return user;
  }
}
