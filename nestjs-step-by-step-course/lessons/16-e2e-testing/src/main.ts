import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS 逐课任务 API')
    .setDescription('第 16 课：经过 E2E 验证的 API 合同')
    .setVersion('16.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  const port = app.get(ConfigService).getOrThrow<number>('app.port');
  await app.listen(port);
  console.log(`第 16 课 Swagger：http://localhost:${port}/docs`);
}

void bootstrap();

export { bootstrap };
