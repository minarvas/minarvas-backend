import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from '../../users/schemas/user.schema';
import { NotificationType } from '../enums/notification-type.enum';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'notifications', timestamps: true })
export class Notification {
  id: string;

  @Prop({ required: true, index: true, ref: User.name })
  userId: string;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: false, nullable: true })
  data: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, default: false })
  read: boolean;

  @Prop({ required: true, index: true, default: Date.now })
  createdAt: Date;
}

const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.plugin(paginate);

NotificationSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
  },
});

NotificationSchema.set('toObject', {
  getters: true,
  virtuals: true,
  transform: function (_, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
  },
});

export { NotificationSchema };
