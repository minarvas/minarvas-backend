import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateBookmarkInput {
  @Field(() => Types.ObjectId, { description: 'The trade post id that the user want to bookmark' })
  tradePostId: Types.ObjectId;
}
