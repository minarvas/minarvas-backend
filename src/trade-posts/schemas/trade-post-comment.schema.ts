import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as paginate from 'mongoose-paginate-v2';

export type TradePostCommentDocument = HydratedDocument<TradePostComment>;

@Schema({ collection: 'trade_post_comments', timestamps: true })
export class TradePostComment {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, index: true, ref: User.name })
  authorId: Types.ObjectId;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}

const TradePostCommentSchema = SchemaFactory.createForClass(TradePostComment);

TradePostCommentSchema.plugin(paginate);

export { TradePostCommentSchema };
