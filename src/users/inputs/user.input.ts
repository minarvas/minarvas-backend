import { Field, InputType } from '@nestjs/graphql';
import { IUser } from '../interfaces/user.interface';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput implements Partial<IUser> {
  @Field()
  @IsString()
  @IsOptional()
  name?: string;
}
