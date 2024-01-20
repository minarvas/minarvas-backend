import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from '../../users/schemas/user.schema';

export type TradePostCommentDocument = HydratedDocument<TradePostComment>;

@Schema({
  collection: 'trade_post_comments',
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class TradePostComment {
  id: string;

  @Prop({ required: true, index: true })
  content: string;

  @Prop({ required: true, type: String, index: true, ref: User.name })
  authorId: string;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}

const TradePostCommentSchema = SchemaFactory.createForClass(TradePostComment);

TradePostCommentSchema.plugin(paginate);

TradePostCommentSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

TradePostCommentSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

export { TradePostCommentSchema };
