import { Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse } from './responses/user.response';
import { Input } from '../graphql/args/input.args';
import { UpdateUserInput } from './inputs/user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthorizedUser } from './decorators/user.decorator';
import { Types } from 'mongoose';

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
  async updateUser(@AuthorizedUser('_id') userId: Types.ObjectId, @Input() input: UpdateUserInput) {
    return await this.userService.updateUser(userId, input);
  }
}
