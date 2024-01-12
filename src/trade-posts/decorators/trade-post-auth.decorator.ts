import { applyDecorators, UseGuards } from '@nestjs/common';
import { TradePostGuard } from '../guards/trade-post.guard';
import { UserAuth } from '../../auth/decorators/auth.decorator';

export const TradePostAuth = () => applyDecorators(UserAuth(), UseGuards(TradePostGuard));
