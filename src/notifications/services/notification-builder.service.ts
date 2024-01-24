import { Injectable } from '@nestjs/common';
import { NotificationType } from '../enums/notification-type.enum';
import { CannotBuildMessage } from '../exceptions/notification.exception';
import { NotificationDataByTradePost } from '../types/notification-data.type';
import { NotificationMessage } from '../types/notification-message.type';

@Injectable()
export class NotificationBuilder {
  getMessage<T extends NotificationDataByTradePost>(type: NotificationType, data: T): NotificationMessage {
    switch (type) {
      case NotificationType.TRADE_POST_COMMENT:
        return this.getTradePostCommentMessage(data);
      default:
        throw new CannotBuildMessage(type);
    }
  }
  private getTradePostCommentMessage(data: NotificationDataByTradePost) {
    const title = data.tradePostTitle;
    const body = `게시글에 새로운 댓글이 달렸습니다.`;
    return { title, body };
  }
}
