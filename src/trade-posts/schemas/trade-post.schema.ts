import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from '../../users/schemas/user.schema';
import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { TradePostComment } from './trade-post-comment.schema';

export type TradePostDocument = HydratedDocument<TradePost>;

@Schema({
  collection: 'trade_posts',
  timestamps: true,
})
export class TradePost {
  id: string;

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

  @Prop({ required: true, type: String, index: true, ref: User.name })
  authorId: string;

  @Prop({ required: false, type: [{ type: String, ref: TradePostComment.name }] })
  comments?: TradePostComment[];

  @Prop({ default: [], required: true, type: [{ type: String, ref: User.name }], index: true })
  bookmarkedBy?: string[];

  @Prop({ required: false })
  image?: string;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, index: true, default: Date.now })
  updatedAt: Date;
}

const TradePostSchema = SchemaFactory.createForClass(TradePost);

TradePostSchema.plugin(paginate);

TradePostSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

TradePostSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

export { TradePostSchema };
