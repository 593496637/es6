import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  configureApp(app);
  const config = app.get(ConfigService);
  if (config.get<boolean>('app.swaggerEnabled', true)) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NestJS 逐课任务 API')
      .setDescription('第 17 课：加入部署边界后的 API 合同')
      .setVersion('17.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  }
  const port = config.getOrThrow<number>('app.port');
  await app.listen(port);
  console.log(`第 17 课：http://localhost:${port}`);
}

void bootstrap();

export { bootstrap };
