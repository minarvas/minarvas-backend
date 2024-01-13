import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: Function) {
    const { method, url, body } = req;

    const query = body.query ?? '';
    const mutation = body.mutation ?? '';

    if (method.toLowerCase() === 'post' && url === '/') {
      return next();
    }
    this.logger.log({ method, url, query, mutation });
    return next();
  }
}
