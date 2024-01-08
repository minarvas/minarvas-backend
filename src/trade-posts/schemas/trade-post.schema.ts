import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { TradeAction } from '../enums/trade-action.enum';
import { User } from '../../users/schemas/user.schema';

export type TradePostDocument = HydratedDocument<TradePost>;

@Schema({ collection: 'trade_posts', timestamps: true })
export class TradePost {
  @Prop({ required: true, enum: TradeAction, index: true })
  action: TradeAction;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, index: true })
  price: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name, index: true })
  authorId: Types.ObjectId;

  @Prop({ required: true, index: true })
  createdAt: Date;

  @Prop({ required: true, index: true })
  updatedAt: Date;
}

export const TradePostSchema = SchemaFactory.createForClass(TradePost);
