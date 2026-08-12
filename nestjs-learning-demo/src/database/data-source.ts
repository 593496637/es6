import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Project } from '../modules/projects/entities/project.entity';
import { Task } from '../modules/tasks/entities/task.entity';
import { User } from '../modules/users/entities/user.entity';
import { InitialSchema1720000000000 } from './migrations/1720000000000-initial-schema';

export default new DataSource({
  type: 'better-sqlite3',
  database: process.env.DB_PATH ?? 'data/taskflow.sqlite',
  entities: [User, Project, Task],
  migrations: [InitialSchema1720000000000],
  synchronize: false,
  migrationsRun: false,
});
