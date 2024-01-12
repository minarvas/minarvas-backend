import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserAuth } from '../../auth/decorators/auth.decorator';

export const TradePostCommentAuth = () => applyDecorators(UserAuth(), UseGuards(TradePostCommentAuth));
