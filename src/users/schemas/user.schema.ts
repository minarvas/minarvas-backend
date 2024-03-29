import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserProvider } from '../enums/user-provider.enum';
import { IAccount } from '../interfaces/account.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, default: 1 })
  tag: number;

  @Prop({ required: false, nullable: true, default: null })
  image: string;

  @Prop({ required: true, default: new Date(), type: mongoose.Schema.Types.Date })
  lastLoginTime: Date;

  @Prop([
    {
      provider: { type: String, required: true, enum: UserProvider },
      createdAt: { type: Date, required: true, default: new Date() },
      updatedAt: { type: Date, required: true, default: new Date() },
    },
  ])
  accounts: IAccount[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

UserSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
  },
});

export { UserSchema };
