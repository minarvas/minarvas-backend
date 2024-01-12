import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthenticatedException } from '../../auth/exceptions/auth.exception';
import { TradePostCommentService } from '../services/trade-post-comment.service';

@Injectable()
export class TradePostCommentGuard implements CanActivate {
  private readonly logger = new Logger(TradePostCommentGuard.name);

  constructor(private readonly tradePostCommentService: TradePostCommentService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const {
      input: { tradePostCommentId },
    } = ctx.getArgs();
    const user = request.user;

    if (!tradePostCommentId) {
      this.logger.error('No trade post comment id provided');
      throw new UnauthenticatedException();
    }

    const comment = await this.tradePostCommentService.getTradePostComment(tradePostCommentId);

    if (!comment) {
      this.logger.error('Trade post comment does not exist');
      throw new UnauthenticatedException();
    }

    if (comment.authorId.toString() !== user._id.toString()) {
      this.logger.error('User is not the author of the comment');
      throw new UnauthenticatedException();
    }

    return true;
  }
}
