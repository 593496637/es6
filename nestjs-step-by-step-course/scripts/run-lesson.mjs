import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const lessonNumber = process.argv[2]?.padStart(2, '0');
const lessonsRoot = resolve('lessons');
const lessonDirectory = lessonNumber
  ? readdirSync(lessonsRoot).find((name) => name.startsWith(`${lessonNumber}-`))
  : undefined;

if (!lessonDirectory) {
  console.error('用法：npm run lesson -- 01（课号范围 01-17）');
  process.exit(1);
}

const entry = resolve(lessonsRoot, lessonDirectory, 'src/main.ts');
if (!existsSync(entry)) {
  console.error(`第 ${lessonNumber} 课没有可运行入口`);
  process.exit(1);
}

console.log(`\n正在启动：${lessonDirectory}`);
console.log(`讲义位置：lessons/${lessonDirectory}/README.md\n`);

const child = spawn(process.execPath, ['-r', 'ts-node/register', entry], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT ?? '3000',
    DB_PATH: process.env.DB_PATH ?? ':memory:',
    DB_MIGRATIONS_RUN: process.env.DB_MIGRATIONS_RUN ?? 'true',
    JWT_SECRET:
      process.env.JWT_SECRET ??
      'course-only-secret-that-is-longer-than-thirty-two-characters',
    JWT_EXPIRES_IN_SECONDS: process.env.JWT_EXPIRES_IN_SECONDS ?? '3600',
    JWT_ISSUER: process.env.JWT_ISSUER ?? 'taskflow-course',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? 'taskflow-student',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS ?? '4',
    CORS_ORIGINS: process.env.CORS_ORIGINS ?? 'http://localhost:3001',
    SWAGGER_ENABLED: process.env.SWAGGER_ENABLED ?? 'true',
  },
});

child.on('exit', (code) => process.exit(code ?? 0));
