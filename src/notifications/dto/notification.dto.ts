import { NotificationDataByTradePost } from '../types/notification-data.type';

export class CreateNotificationDTO<T extends NotificationDataByTradePost = any> {
  userId: string;
  data: T;
}
