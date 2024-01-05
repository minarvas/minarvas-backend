import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserProvider } from '../enums/user-provider.enum';
import { IAccount } from '../interfaces/account.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: new Date(), type: mongoose.Schema.Types.Date })
  lastLoginTime: Date;

  @Prop()
  refreshToken?: string | null;

  @Prop([
    {
      provider: { type: String, required: true, enum: UserProvider },
      createdAt: { type: Date, required: true, default: new Date() },
      updatedAt: { type: Date, required: true, default: new Date() },
    },
  ])
  accounts: IAccount[];
}

export const UserSchema = SchemaFactory.createForClass(User);
