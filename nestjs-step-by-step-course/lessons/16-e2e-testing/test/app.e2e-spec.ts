import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

describe('认证项目流程 (E2E)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.DB_PATH = ':memory:';
    process.env.JWT_SECRET = 'e2e-secret-that-is-longer-than-thirty-two-chars';
    app = await NestFactory.create(AppModule, { logger: false });
    configureApp(app);
    await app.init();
  });

  afterEach(async () => app.close());

  async function register(
    email: string,
  ): Promise<{ token: string; userId: string }> {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, displayName: 'E2E 学习者', password: 'LearnNest123!' })
      .expect(201);

    return {
      token: response.body.accessToken as string,
      userId: response.body.user.id as string,
    };
  }

  it('匿名读取项目得到 401', async () => {
    await request(app.getHttpServer()).get('/projects').expect(401);
  });

  it('注册后能创建自己的项目', async () => {
    const { token, userId } = await register('create-project@example.com');

    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'E2E 项目' })
      .expect(201);

    expect(created.body.ownerId).toBe(userId);
  });

  it('能在自己的项目中创建并分页查询任务', async () => {
    const { token } = await register('list-tasks@example.com');
    const project = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '任务项目' })
      .expect(201);
    const projectId = project.body.id as string;

    await request(app.getHttpServer())
      .post(`/projects/${projectId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '第一条 E2E 任务' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/projects/${projectId}/tasks?page=1&limit=10`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toMatchObject({ page: 1, limit: 10, total: 1 });
  });
});
