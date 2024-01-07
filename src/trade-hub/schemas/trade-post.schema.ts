import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { TradeAction } from '../enums/trade-action.enum';
import { User } from '../../users/schemas/user.schema';

export type TradePostDocument = HydratedDocument<TradePost>;

@Schema({ timestamps: true })
export class TradePost {
  @Prop({ required: true, enum: TradeAction })
  action: TradeAction;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  authorId: Types.ObjectId;
}

export const TradePostSchema = SchemaFactory.createForClass(TradePost);
