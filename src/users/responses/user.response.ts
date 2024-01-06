import { Field, ObjectType } from '@nestjs/graphql';
import { AccountResponse } from './account.response';
import { IUser } from '../interfaces/user.interface';
import { Exclude, Transform } from 'class-transformer';
import { BaseResponse } from '../../common/responses/base.response';
import { DeepPartial } from 'typeorm';

@ObjectType()
export class UserResponse extends BaseResponse implements IUser {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  lastLoginTime: Date;

  @Field((_type) => [AccountResponse])
  @Transform(({ value }) => value.map((account) => new AccountResponse(account)))
  accounts: AccountResponse[];

  @Exclude()
  refreshToken?: string;

  constructor(partial: DeepPartial<UserResponse>) {
    super(partial);
    Object.assign(this, {
      email: partial?.email,
      name: partial?.name,
      lastLoginTime: partial?.lastLoginTime,
      accounts: partial?.accounts,
      refreshToken: partial?.refreshToken,
    });
  }
}
