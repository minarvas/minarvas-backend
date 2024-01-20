import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TradePost } from '../../trade-posts/schemas/trade-post.schema';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema({
  collection: 'bookmarks',
  timestamps: true,
})
export class Bookmark {
  id: string;

  @Prop({ required: true, unique: true, index: true })
  userId: string;

  @Prop({ default: [], required: true, type: [{ type: String, ref: TradePost.name }] })
  tradePosts?: TradePost[];

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}

const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

BookmarkSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

BookmarkSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

export { BookmarkSchema };
