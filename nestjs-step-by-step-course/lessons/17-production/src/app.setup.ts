import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { RequestIdMiddleware } from './common/request-id.middleware';

/** 真实启动与 E2E 共用同一组 HTTP 边界配置。 */
export function configureApp(
  app: INestApplication & NestExpressApplication,
): void {
  const config = app.get(ConfigService);
  const trustProxy = config.get<string>('app.trustProxy');
  if (trustProxy) app.set('trust proxy', trustProxy);

  // 请求 ID 要早于 JSON parser，畸形 JSON 的 400 也必须可追踪。
  const requestId = new RequestIdMiddleware();
  app.use(requestId.use.bind(requestId));
  app.use(helmet());
  app.enableCors({
    origin: config.get<string[]>('app.corsOrigins', []),
  });
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));
  app.enableShutdownHooks();
}
