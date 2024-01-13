import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly requestLogger = new Logger('REQUEST');

  use(req: Request, res: Response, next: Function) {
    const { method, detail } = this.parseQuery(req.body?.query || '');
    const operationName = req.body?.operationName;
    const variables = req.body?.variables;

    if (!operationName || operationName.startsWith('IntrospectionQuery')) {
      return next();
    }

    this.requestLogger.log(JSON.stringify({ method, operationName, variables, detail }));
    return next();
  }

  private parseQuery(query: string) {
    const formatted = query
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .join(' ');
    const [method, ...restArray] = formatted.split(/\s+/);

    // Handle the case when the GraphQL request has no curly braces.
    const detail = restArray.join(' ').trim();

    return { method, detail };
  }
}
