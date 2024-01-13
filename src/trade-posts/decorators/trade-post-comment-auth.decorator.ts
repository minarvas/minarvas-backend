import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserAuth } from '../../auth/decorators/auth.decorator';
import { TradePostCommentGuard } from '../guards/trade-post-comment.guard';

export const TradePostCommentAuth = () => applyDecorators(UserAuth(), UseGuards(TradePostCommentGuard));
