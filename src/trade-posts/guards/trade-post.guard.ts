import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TradePostService } from '../trade-post.service';
import { UnauthenticatedException } from '../../auth/exceptions/auth.exception';

@Injectable()
export class TradePostGuard implements CanActivate {
  private readonly logger = new Logger(TradePostGuard.name);

  constructor(private readonly tradePostService: TradePostService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const {
      input: { tradePostId },
    } = ctx.getArgs();
    const user = request.user;

    if (!tradePostId) {
      this.logger.error('No trade post id provided');
      throw new UnauthenticatedException();
    }

    const tradePost = await this.tradePostService.getTradePost(tradePostId);

    if (!tradePost) {
      this.logger.error('Trade post does not exist');
      throw new UnauthenticatedException();
    }

    if (tradePost.authorId.toString() !== user._id.toString()) {
      this.logger.error('User is not the author of the trade post');
      throw new UnauthenticatedException();
    }

    return true;
  }
}
