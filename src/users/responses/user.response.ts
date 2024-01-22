import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseResponse } from '../../common/responses/base.response';
import { IAccount } from '../interfaces/account.interface';
import { IUser } from '../interfaces/user.interface';
import { AccountResponse } from './account.response';

@ObjectType()
export class UserResponse extends BaseResponse implements IUser {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ defaultValue: 1, description: 'The tag of the user' })
  tag: number;

  @Field({ nullable: true, defaultValue: null, description: 'The image of the user' })
  image: string;

  @Field()
  lastLoginTime: Date;

  @Field((_type) => [AccountResponse])
  @Transform(({ value }) => value.map((account) => new AccountResponse(account)))
  accounts: IAccount[];

  constructor(partial: Partial<UserResponse>) {
    super(partial);
    Object.assign(this, {
      email: partial?.email,
      name: partial?.name,
      lastLoginTime: partial?.lastLoginTime,
      tag: partial?.tag,
      image: partial?.image,
      accounts: partial?.accounts,
    });
  }
}
