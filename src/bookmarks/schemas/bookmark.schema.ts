import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TradePost } from '../../trade-posts/schemas/trade-post.schema';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema({ collection: 'bookmarks', timestamps: true })
export class Bookmark {
  @Prop({ required: true, unique: true, index: true })
  userId: Types.ObjectId;

  @Prop({ default: [], required: true, type: [{ type: Types.ObjectId, ref: TradePost.name }] })
  tradePosts?: TradePost[];

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}

const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

export { BookmarkSchema };
