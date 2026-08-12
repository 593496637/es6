import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import { InitialSchema1720000000000 } from './database/migrations/1720000000000-initial-schema';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { Project } from './modules/projects/entities/project.entity';
import { ProjectsModule } from './modules/projects/projects.module';
import { Task } from './modules/tasks/entities/task.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, authConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.getOrThrow<string>('database.path');
        const isTest = configService.get<string>('app.nodeEnv') === 'test';
        const isSafeTestDatabase =
          database === ':memory:' || database.endsWith('.test.sqlite');

        if (isTest && !isSafeTestDatabase) {
          throw new Error(
            '测试环境 DB_PATH 必须是 :memory: 或以 .test.sqlite 结尾',
          );
        }

        return {
          type: 'better-sqlite3' as const,
          database,
          entities: [User, Project, Task],
          migrations: [InitialSchema1720000000000],
          migrationsRun: configService.get<boolean>(
            'database.migrationsRun',
            false,
          ),
          synchronize: false,
          dropSchema: isTest,
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('auth.jwtSecret'),
        signOptions: {
          expiresIn: configService.get<number>(
            'auth.jwtExpiresInSeconds',
            3600,
          ),
          issuer: configService.get<string>('auth.jwtIssuer', 'taskflow-api'),
          audience: configService.get<string>(
            'auth.jwtAudience',
            'taskflow-client',
          ),
        },
        verifyOptions: {
          issuer: configService.get<string>('auth.jwtIssuer', 'taskflow-api'),
          audience: configService.get<string>(
            'auth.jwtAudience',
            'taskflow-client',
          ),
        },
      }),
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
