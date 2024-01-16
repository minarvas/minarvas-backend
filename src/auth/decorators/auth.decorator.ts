import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { OptionalAuthGuard } from '../guards/optional-auth.guard';

export const UserAuth = () => applyDecorators(UseGuards(AuthGuard));

export const OptionalUserAuth = () => applyDecorators(UseGuards(OptionalAuthGuard));
