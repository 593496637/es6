import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { InitialSchema1730000000000 } from './database/1730000000000-initial-schema';
import { LoggingInterceptor } from './common/logging.interceptor';
import { RequestIdMiddleware } from './common/request-id.middleware';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: { port: Number(process.env.PORT ?? 3000) },
          database: { path: process.env.DB_PATH ?? ':memory:' },
        }),
      ],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        DB_PATH: Joi.string().default(':memory:'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3' as const,
        database: config.getOrThrow<string>('database.path'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: [InitialSchema1730000000000],
        migrationsRun: true,
      }),
    }),
    ProjectsModule,
    TasksModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('{*path}');
  }
}
