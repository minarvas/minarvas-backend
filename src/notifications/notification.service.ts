import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDTO } from './dto/notification.dto';
import { NotificationType } from './enums/notification-type.enum';
import { NotificationResponse } from './responses/notification.response';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { NotificationBuilder } from './services/notification-builder.service';
import { NotificationDataByTradePost } from './types/notification-data.type';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
    private readonly notificaitonBuilder: NotificationBuilder,
  ) {}

  async notifyTradePostComment({ data, userId }: CreateNotificationDTO<NotificationDataByTradePost>) {
    try {
      const type = NotificationType.TRADE_POST_COMMENT;
      const { title, body } = this.notificaitonBuilder.getMessage(type, data);
      const notification = await this.notificationModel.create({ title, body, type, userId });
      return new NotificationResponse(notification);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
