import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { ExceptionFilter } from '@nestjs/common';
import type { RequestWithId } from './request-id.middleware';

interface HealthCheckError {
  status: 'error' | 'shutting_down';
  info: Record<string, unknown>;
  error: Record<string, unknown>;
  details: Record<string, unknown>;
}

function isHealthCheckError(value: unknown): value is HealthCheckError {
  if (!value || typeof value !== 'object') return false;
  const body = value as Partial<HealthCheckError>;
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
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<RequestWithId>();
    const response = http.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const raw =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        '未处理异常',
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    // Terminus 的响应是平台健康协议的一部分，不能套成通用错误信封。
    if (status === HttpStatus.SERVICE_UNAVAILABLE && isHealthCheckError(raw)) {
      this.adapterHost.httpAdapter.reply(response, raw, status);
      return;
    }

    const message =
      typeof raw === 'object' && raw !== null && 'message' in raw
        ? (raw as { message: string | string[] }).message
        : typeof raw === 'string'
          ? raw
          : '服务器内部错误';

    this.adapterHost.httpAdapter.reply(
      response,
      {
        statusCode: status,
        message,
        path: request.url,
        requestId: request.requestId,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
