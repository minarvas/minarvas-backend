import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AccountResponse } from './responses/account.response';
import { UserResponse } from './responses/user.response';
import { Input } from '../graphql/args/input.args';
import { UpdateUserInput } from './inputs/user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthorizedUser } from './decorators/user.decorator';
import { Types } from 'mongoose';

@Resolver((of) => AccountResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  async isExistUser(@Args('email') email: string): Promise<boolean> {
    return await this.userService.isExistUser(email);
  }

  @Mutation(() => UserResponse)
  @UseGuards(AuthGuard)
  async updateUser(@AuthorizedUser('_id') userId: Types.ObjectId, @Input() input: UpdateUserInput) {
    return await this.userService.updateUser(userId, input);
  }
}
