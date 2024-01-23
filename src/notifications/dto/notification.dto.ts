import { NotificationType } from '../enums/notification-type.enum';
import { NotificationDataByTradePost } from '../types/notification-data.type';

export class CreateNotificationDTO<T extends NotificationDataByTradePost> {
  userId: string;
  type: NotificationType;
  data: T;
}
