import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDTO } from './dto/notification.dto';
import { NotificationResponse } from './responses/notification.response';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { NotificationBuilder } from './services/notification-builder.service';
import { NotificationDataByTradePost } from './types/notification-data.type';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
    private readonly notificaitonBuilder: NotificationBuilder,
  ) {}

  async notifyTradePostComment(dto: CreateNotificationDTO<NotificationDataByTradePost>) {
    const { title, body } = this.notificaitonBuilder.getMessage(dto.type, dto.data);
    const notification = await this.notificationModel.create({ title, body, ...dto });
    return new NotificationResponse(notification);
  }
}
