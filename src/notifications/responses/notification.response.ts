import { Field, ObjectType } from '@nestjs/graphql';
import { NotificationType } from '../enums/notification-type.enum';
import { INotification } from '../interfaces/notification.interface';

@ObjectType()
export class NotificationResponse implements INotification {
  constructor(partial: Partial<NotificationResponse>) {
    this.id = partial.id;
    this.userId = partial.userId;
    this.type = partial.type;
    this.data = partial.data;
    this.title = partial.title;
    this.body = partial.body;
    this.read = partial.read;
    this.createdAt = partial.createdAt;
  }
  @Field()
  id: string;

  @Field(() => NotificationType, { description: 'The type of the notification like trade_post_comment.' })
  type: NotificationType;

  @Field({ description: 'The user id of the notification' })
  userId: string;

  @Field({ description: 'The title of the notification' })
  title: string;

  @Field({ description: 'The body of the notification' })
  body: string;

  @Field({ nullable: true })
  data: string;

  @Field({ defaultValue: false })
  read: boolean;

  @Field()
  createdAt: Date;
}
