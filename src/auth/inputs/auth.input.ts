import { UserProvider } from '../../users/enums/user-provider.enum';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

@InputType()
export class AuthUrlInput {
  @Field(() => UserProvider)
  @IsEnum(UserProvider)
  provider: UserProvider;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  refreshToken: string;
}
