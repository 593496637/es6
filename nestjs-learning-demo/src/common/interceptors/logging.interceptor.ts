import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';
import type { RequestWithId } from '../middleware/request-id.middleware';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<Request & RequestWithId>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        finalize: () => {
          this.logger.log(
            `${request.method} ${request.originalUrl} ${Date.now() - startedAt}ms requestId=${request.requestId ?? 'unknown'}`,
          );
        },
      }),
    );
  }
}
