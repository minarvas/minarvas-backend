import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Input } from '../graphql/args/input.args';
import { AuthorizedUser } from './decorators/user.decorator';
import { UpdateUserInput } from './inputs/user.input';
import { UserResponse } from './responses/user.response';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Mutation description:
   * This mutation requires authentication.
   * Please include the JWT token in the "Authorization" header.
   */
  @Mutation(() => UserResponse)
  @UseGuards(AuthGuard)
  async updateUser(@AuthorizedUser('id') userId: string, @Input() input: UpdateUserInput) {
    return await this.userService.updateUser(userId, input);
  }
}
