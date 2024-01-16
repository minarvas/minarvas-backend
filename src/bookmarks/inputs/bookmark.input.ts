import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBookmarkInput {
  @Field({ description: 'The trade post id that the user want to bookmark' })
  @IsString()
  tradePostId: string;
}
