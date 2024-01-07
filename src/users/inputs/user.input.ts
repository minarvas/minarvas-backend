import { Field, InputType } from '@nestjs/graphql';
import { IUser } from '../interfaces/user.interface';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput implements Partial<IUser> {
  @Field()
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;
}
