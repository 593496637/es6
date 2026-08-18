import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { join } from 'node:path';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

/** 生产启动和 E2E 共用同一组 HTTP 边界配置，避免测试与真实应用漂移。 */
export function configureApp(app: NestExpressApplication): void {
  const config = app.get(ConfigService);
  const corsOrigins = config.get<string[]>('app.corsOrigins', []);
  const trustProxy = config.get<string>('app.trustProxy');
  const swaggerEnabled = config.get<boolean>('app.swaggerEnabled', false);

  if (trustProxy) app.set('trust proxy', trustProxy);

  const requestIdMiddleware = new RequestIdMiddleware();
  app.use(requestIdMiddleware.use.bind(requestIdMiddleware));
  app.use(helmet());
  app.enableCors({
    origin: corsOrigins.length > 0 ? corsOrigins : false,
    credentials: true,
  });
  // 教学用可视化面板，与 API 同源提供，不需要额外的 CORS 配置。
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  if (swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('TaskFlow API')
      .setDescription('NestJS 渐进式课程的最终可运行 REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup('api/docs', app, () =>
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  }
}
