import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { InitialSchema1730000000000 } from './database/1730000000000-initial-schema';
import { AddProjectOwner1740000000000 } from './database/1740000000000-add-project-owner';
import { LoggingInterceptor } from './common/logging.interceptor';
import { RequestIdMiddleware } from './common/request-id.middleware';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: { port: Number(process.env.PORT ?? 3000) },
          database: { path: process.env.DB_PATH ?? ':memory:' },
          auth: {
            jwtSecret:
              process.env.JWT_SECRET ??
              'lesson-only-secret-at-least-32-characters',
          },
        }),
      ],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        DB_PATH: Joi.string().default(':memory:'),
        JWT_SECRET: Joi.string()
          .min(32)
          .default('lesson-only-secret-at-least-32-characters'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3' as const,
        database: config.getOrThrow<string>('database.path'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: [InitialSchema1730000000000, AddProjectOwner1740000000000],
        migrationsRun: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('auth.jwtSecret'),
        signOptions: { expiresIn: 3600 },
      }),
    }),
    AuthModule,
    ProjectsModule,
    TasksModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('{*path}');
  }
}
