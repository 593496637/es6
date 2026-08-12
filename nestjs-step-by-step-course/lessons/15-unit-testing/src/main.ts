import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS 逐课任务 API')
    .setDescription('第 15 课：加入单元测试后的 API 合同')
    .setVersion('15.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  const port = app.get(ConfigService).getOrThrow<number>('app.port');
  await app.listen(port);
  console.log(`第 15 课 Swagger：http://localhost:${port}/docs`);
}

void bootstrap();
