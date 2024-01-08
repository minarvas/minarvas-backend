import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export const Authorize = () => applyDecorators(UseGuards(AuthGuard));
