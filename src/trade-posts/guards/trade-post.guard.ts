import { CanActivate, Inject, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthenticatedException } from '../../auth/exceptions/auth.exception';
import { ITradePostService } from '../interfaces/trade-post.interface';
import { TradePostService } from '../trade-post.service';

@Injectable()
export class TradePostGuard implements CanActivate {
  private readonly logger = new Logger(TradePostGuard.name);

  constructor(@Inject(ITradePostService) private readonly tradePostService: TradePostService) {}

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

    const tradePost = await this.tradePostService.getTradePostById(tradePostId);

    if (!tradePost) {
      this.logger.error('Trade post does not exist');
      throw new UnauthenticatedException();
    }

    if (tradePost.authorId.toString() !== user.id.toString()) {
      this.logger.error('User is not the author of the trade post');
      throw new UnauthenticatedException();
    }

    return true;
  }
}
