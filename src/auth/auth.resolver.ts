import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Input } from '../graphql/args/input.args';
import { UserResponse } from '../users/responses/user.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserService } from '../users/user.service';
import { AuthUrlInput, RefreshTokenInput } from './inputs/auth.input';
import { AuthUrlResponse } from './responses/auth-url.response';
import { GraphqlContext } from '../graphql/types/graphql-context.type';

@Resolver(() => UserResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Query(() => AuthUrlResponse)
  async getAuthUrl(@Input() input: AuthUrlInput) {
    return await this.authService.getAuthUrl(input.provider);
  }

  @Query(() => UserResponse)
  @UseGuards(AuthGuard)
  async me(@AuthorizedUser() user: UserResponse) {
    return user;
  }

  @Mutation(() => UserResponse)
  async refreshToken(@Input() input: RefreshTokenInput, @Context() context: GraphqlContext) {
    const { jwtToken, user } = await this.authService.refreshToken(input.refreshToken);
    context.res.header('Access-Token', jwtToken.accessToken);
    context.res.header('Refresh-Token', jwtToken.refreshToken);
    return user;
  }
}
