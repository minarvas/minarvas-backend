import { UseGuards } from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) {}

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
    You can get new access-token and refresh-token ( Access-Token in header, Refresh-Token in cookie ).`,
  })
  async refreshToken(@RefreshToken() refreshToken: string, @Context() context: GraphqlContext) {
    const { jwtToken, user } = await this.authService.refreshToken(refreshToken);
    context.res.header('Access-Token', jwtToken.accessToken);
    context.res.cookie('Refresh-Token', jwtToken.refreshToken);
    context.res.header('Access-Control-Expose-Headers', 'Access-Token');
    context.res.header('Access-Control-Allow-Credentials', 'true');
    context.res.header('Access-Control-Allow-Origin', 'https://sandbox.embed.apollographql.com');
    return user;
  }
}
