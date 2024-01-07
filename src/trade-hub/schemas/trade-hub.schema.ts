import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { TradeAction } from '../enums/trade-action.enum';

export type TradeHubDocument = HydratedDocument<TradeHub>;

@Schema({ timestamps: true })
export class TradeHub {
  @Prop({ required: true, enum: TradeAction })
  action: TradeAction;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: Types.ObjectId;
}

export const TradeHubSchema = SchemaFactory.createForClass(TradeHub);
