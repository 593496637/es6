import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1720000000000 implements MigrationInterface {
  name = 'InitialSchema1720000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(255) NOT NULL, "displayName" varchar(80) NOT NULL, "passwordHash" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "description" text, "ownerId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_projects_owner" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_projects_ownerId" ON "projects" ("ownerId")',
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "projectId" varchar NOT NULL, "title" varchar(120) NOT NULL, "description" text, "status" varchar(20) NOT NULL DEFAULT ('todo'), "priority" varchar(20) NOT NULL DEFAULT ('medium'), "dueDate" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_tasks_project" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_tasks_projectId" ON "tasks" ("projectId")',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_tasks_projectId_status" ON "tasks" ("projectId", "status")',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "tasks"');
    await queryRunner.query('DROP TABLE "projects"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
