import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  path: process.env.DB_PATH ?? 'data/taskflow.sqlite',
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
}));
