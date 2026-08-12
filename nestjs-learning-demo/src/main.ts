import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 3000);
  configureApp(app);

  await app.listen(port);
  Logger.log(`TaskFlow running at http://localhost:${port}/api`, 'Bootstrap');
  if (config.get<boolean>('app.swaggerEnabled', false)) {
    Logger.log(`Swagger at http://localhost:${port}/api/docs`, 'Bootstrap');
  }
}

void bootstrap();
