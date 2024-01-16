import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from '../../users/schemas/user.schema';
import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { TradePostComment } from './trade-post-comment.schema';

export type TradePostDocument = HydratedDocument<TradePost>;

@Schema({ collection: 'trade_posts', timestamps: true })
export class TradePost {
  _id: Types.ObjectId;

  @Prop({ required: true, enum: TradeAction, index: true })
  action: TradeAction;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, index: true })
  price: number;

  @Prop({ required: true, index: true, enum: TradeStatus, default: TradeStatus.OPEN })
  status: TradeStatus;

  @Prop({ required: true, type: Types.ObjectId, index: true, ref: User.name })
  authorId: Types.ObjectId;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: TradePostComment.name }] })
  comments?: TradePostComment[];

  @Prop({ default: [], required: true, type: [{ type: Types.ObjectId, ref: User.name }], index: true })
  bookmarkedBy?: Types.ObjectId[];

  @Prop({ required: false })
  image?: string;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, index: true, default: Date.now })
  updatedAt: Date;
}

const TradePostSchema = SchemaFactory.createForClass(TradePost);

TradePostSchema.plugin(paginate);

export { TradePostSchema };
