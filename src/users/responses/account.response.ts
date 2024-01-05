import { UserProvider } from '../enums/user-provider.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { IAccount } from '../interfaces/account.interface';
import { BaseResponse } from '../../common/responses/base.response';

@ObjectType()
export class AccountResponse extends BaseResponse implements IAccount {
  @Field(() => UserProvider)
  provider: UserProvider;

  constructor(partial: Partial<AccountResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
