import { IUser } from '../interfaces/user.interface';
import { Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserProvider } from '../enums/user-provider.enum';

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

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => UserProvider)
  @IsNotEmpty()
  provider: UserProvider;
}
