import { Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserProvider } from '../enums/user-provider.enum';
import { IUser } from '../interfaces/user.interface';

export class UpdateUserDTO implements Partial<IUser> {
  name?: string;
  lastLoginTime?: Date;
  refreshToken?: string | null;
}

export class CreateUserDTO implements Partial<IUser> {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => UserProvider)
  @IsNotEmpty()
  provider: UserProvider;
}
