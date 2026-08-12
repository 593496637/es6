import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { RequestWithId } from '../middleware/request-id.middleware';

interface ErrorBody {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
  requestId?: string;
}

interface HealthCheckBody {
  status: 'error' | 'shutting_down';
  info: Record<string, unknown>;
  error: Record<string, unknown>;
  details: Record<string, unknown>;
}

function isHealthCheckBody(value: unknown): value is HealthCheckBody {
  if (!value || typeof value !== 'object') return false;
  const body = value as Partial<HealthCheckBody>;
  return (
    (body.status === 'error' || body.status === 'shutting_down') &&
    typeof body.info === 'object' &&
    typeof body.error === 'object' &&
    typeof body.details === 'object'
  );
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request & RequestWithId>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    // Terminus 的 readiness 结构是平台健康协议的一部分，不套通用错误信封。
    if (status === 503 && isHealthCheckBody(exceptionResponse)) {
      response.status(status).json(exceptionResponse);
      return;
    }

    let message: string | string[] = '服务器内部错误';
    let error = HttpStatus[status] ?? 'Error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (exceptionResponse && typeof exceptionResponse === 'object') {
      const body = exceptionResponse as {
        message?: string | string[];
        error?: unknown;
      };
      message = body.message ?? message;
      if (typeof body.error === 'string') error = body.error;
    }

    const body: ErrorBody = {
      statusCode: status,
      error,
      message,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      requestId: request.requestId,
    };

    if (!(exception instanceof HttpException)) {
      const details =
        exception instanceof Error ? exception.stack : String(exception);
      this.logger.error(
        `Unhandled exception requestId=${request.requestId ?? 'unknown'}`,
        details,
      );
    }

    response.status(status).json(body);
  }
}
