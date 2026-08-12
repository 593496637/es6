import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { InitialSchema1730000000000 } from './database/1730000000000-initial-schema';
import { AddProjectOwner1740000000000 } from './database/1740000000000-add-project-owner';
import { LoggingInterceptor } from './common/logging.interceptor';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TasksModule } from './tasks/tasks.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: {
            port: Number(process.env.PORT ?? 3000),
            swaggerEnabled: process.env.SWAGGER_ENABLED !== 'false',
            trustProxy: process.env.TRUST_PROXY || undefined,
            corsOrigins: (process.env.CORS_ORIGINS ?? '')
              .split(',')
              .map((origin) => origin.trim())
              .filter(Boolean),
          },
          database: {
            path: process.env.DB_PATH ?? ':memory:',
            migrationsRun: process.env.DB_MIGRATIONS_RUN !== 'false',
          },
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
        DB_MIGRATIONS_RUN: Joi.boolean()
          .truthy('true')
          .falsy('false')
          .default(true),
        JWT_SECRET: Joi.string()
          .min(32)
          .default('lesson-only-secret-at-least-32-characters'),
        CORS_ORIGINS: Joi.string().allow('').default(''),
        SWAGGER_ENABLED: Joi.boolean()
          .truthy('true')
          .falsy('false')
          .default(true),
        TRUST_PROXY: Joi.string().allow('').default(''),
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
        migrationsRun: config.getOrThrow<boolean>('database.migrationsRun'),
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
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    AuthModule,
    ProjectsModule,
    TasksModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
