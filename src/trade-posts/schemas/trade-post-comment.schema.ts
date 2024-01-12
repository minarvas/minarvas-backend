import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class TradePostComment {
  @Prop({ required: true, index: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, index: true, ref: User.name })
  commenter: Types.ObjectId;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}
