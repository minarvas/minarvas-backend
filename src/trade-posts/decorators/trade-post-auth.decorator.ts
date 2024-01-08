import { applyDecorators, UseGuards } from '@nestjs/common';
import { TradePostGuard } from '../guards/trade-post.guard';
import { Authorize } from '../../auth/decorators/auth.decorator';

export const TradePostAuth = () => applyDecorators(Authorize(), UseGuards(TradePostGuard));
