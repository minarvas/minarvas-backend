import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: Function) {
    const { method, url, body, query } = req;

    if (method.toLowerCase() === 'post' && url === '/') {
      return next();
    }
    this.logger.log(`Request ${JSON.stringify({ method, url, body, query })}`);
    return next();
  }
}
