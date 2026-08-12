import { INestApplication } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

interface AuthResponseBody {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

interface EntityResponseBody {
  id: string;
}

describe('TaskFlow API (e2e)', () => {
  let app: INestApplication<App> | undefined;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>({
      bodyParser: false,
    });
    configureApp(app as NestExpressApplication);
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  const httpServer = (): App => {
    if (!app) throw new Error('E2E application is not initialized');
    return app.getHttpServer();
  };

  const register = async (
    email = 'student@example.com',
  ): Promise<AuthResponseBody> => {
    const response = await request(httpServer())
      .post('/api/auth/register')
      .send({
        email,
        displayName: 'Nest 学习者',
        password: 'LearnNest123!',
      })
      .expect(201);
    return response.body as AuthResponseBody;
  };

  it('完成注册、登录、项目和任务的完整 CRUD 流程', async () => {
    const registered = await register();
    expect(registered.user).not.toHaveProperty('passwordHash');

    const loginResponse = await request(httpServer())
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'LearnNest123!' })
      .expect(200);
    const { accessToken } = loginResponse.body as AuthResponseBody;
    const auth = { Authorization: `Bearer ${accessToken}` };

    await request(httpServer())
      .get('/api/auth/me')
      .set(auth)
      .expect(200)
      .expect(({ body }: { body: { email: string } }) => {
        expect(body.email).toBe('student@example.com');
      });

    const projectResponse = await request(httpServer())
      .post('/api/projects')
      .set(auth)
      .send({ name: 'NestJS 课程', description: '循序渐进学习' })
      .expect(201);
    const projectId = (projectResponse.body as EntityResponseBody).id;

    await request(httpServer())
      .get('/api/projects')
      .set(auth)
      .expect(200)
      .expect(({ body }: { body: unknown[] }) => expect(body).toHaveLength(1));

    await request(httpServer())
      .patch(`/api/projects/${projectId}`)
      .set(auth)
      .send({ name: 'NestJS 深入课程' })
      .expect(200)
      .expect(({ body }: { body: { name: string } }) => {
        expect(body.name).toBe('NestJS 深入课程');
      });

    const taskResponse = await request(httpServer())
      .post(`/api/projects/${projectId}/tasks`)
      .set(auth)
      .send({ title: '理解依赖注入', priority: 'high' })
      .expect(201);
    const taskId = (taskResponse.body as EntityResponseBody).id;

    await request(httpServer())
      .get(`/api/projects/${projectId}/tasks/${taskId}`)
      .set(auth)
      .expect(200);

    await request(httpServer())
      .patch(`/api/projects/${projectId}/tasks/${taskId}`)
      .set(auth)
      .send({ status: 'done' })
      .expect(200)
      .expect(({ body }: { body: { status: string } }) => {
        expect(body.status).toBe('done');
      });

    await request(httpServer())
      .get(`/api/projects/${projectId}/tasks?status=done&page=1&limit=10`)
      .set(auth)
      .expect(200)
      .expect(
        ({ body }: { body: { data: unknown[]; meta: { total: number } } }) => {
          expect(body.data).toHaveLength(1);
          expect(body.meta.total).toBe(1);
        },
      );

    await request(httpServer())
      .delete(`/api/projects/${projectId}/tasks/${taskId}`)
      .set(auth)
      .expect(204);
    await request(httpServer())
      .delete(`/api/projects/${projectId}`)
      .set(auth)
      .expect(204);
    await request(httpServer())
      .get(`/api/projects/${projectId}`)
      .set(auth)
      .expect(404);
  });

  it('统一处理认证失败和重复邮箱且不泄露账号状态', async () => {
    await register();

    const duplicate = await request(httpServer())
      .post('/api/auth/register')
      .send({
        email: 'STUDENT@example.com',
        displayName: '重复用户',
        password: 'LearnNest123!',
      })
      .expect(409);
    expect(duplicate.body).toMatchObject({ message: '该邮箱已经注册' });

    const wrongPassword = await request(httpServer())
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'WrongPass123!' })
      .expect(401);
    const missingUser = await request(httpServer())
      .post('/api/auth/login')
      .send({ email: 'missing@example.com', password: 'WrongPass123!' })
      .expect(401);
    const wrongPasswordBody = wrongPassword.body as { message: string };
    const missingUserBody = missingUser.body as { message: string };
    expect(wrongPasswordBody.message).toBe('邮箱或密码错误');
    expect(missingUserBody.message).toBe(wrongPasswordBody.message);

    await request(httpServer()).get('/api/projects').expect(401);
    await request(httpServer())
      .get('/api/projects')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  it('按 UTF-8 字节限制 bcrypt 密码，避免 72 字节静默截断', async () => {
    const longMultibytePassword = `${'你'.repeat(24)}A1`;

    await request(httpServer())
      .post('/api/auth/register')
      .send({
        email: 'bytes@example.com',
        displayName: '字节边界',
        password: longMultibytePassword,
      })
      .expect(400)
      .expect(({ body }: { body: { message: string[] } }) => {
        expect(body.message).toContain(
          'password 的 UTF-8 编码不能超过 72 字节',
        );
      });
  });

  it('拒绝非法 DTO、分页边界、空白字段、null 和非法 UUID', async () => {
    await request(httpServer())
      .post('/api/auth/register')
      .set('x-request-id', 'lesson-validation-test')
      .send({
        email: 'another@example.com',
        displayName: '另一个用户',
        password: 'LearnNest123!',
        role: 'admin',
      })
      .expect(400)
      .expect(
        ({ body }: { body: { requestId: string; message: string[] } }) => {
          expect(body.requestId).toBe('lesson-validation-test');
          expect(body.message).toContain('property role should not exist');
        },
      );

    const { accessToken } = await register('validation@example.com');
    const auth = { Authorization: `Bearer ${accessToken}` };
    await request(httpServer())
      .post('/api/projects')
      .set(auth)
      .send({ name: '   ' })
      .expect(400);

    const projectResponse = await request(httpServer())
      .post('/api/projects')
      .set(auth)
      .send({ name: '校验边界' })
      .expect(201);
    const projectId = (projectResponse.body as EntityResponseBody).id;

    await request(httpServer())
      .patch(`/api/projects/${projectId}`)
      .set(auth)
      .send({ name: null })
      .expect(400);
    await request(httpServer())
      .get(`/api/projects/${projectId}/tasks?limit=101`)
      .set(auth)
      .expect(400);
    await request(httpServer())
      .get('/api/projects/not-a-uuid')
      .set(auth)
      .expect(400);

    const taskResponse = await request(httpServer())
      .post(`/api/projects/${projectId}/tasks`)
      .set(auth)
      .send({ title: '测试 null' })
      .expect(201);
    const taskId = (taskResponse.body as EntityResponseBody).id;
    await request(httpServer())
      .patch(`/api/projects/${projectId}/tasks/${taskId}`)
      .set(auth)
      .send({ title: null })
      .expect(400);
  });

  it('阻止其他用户读取不属于自己的项目', async () => {
    const owner = await register('owner@example.com');
    const projectResponse = await request(httpServer())
      .post('/api/projects')
      .set('Authorization', `Bearer ${owner.accessToken}`)
      .send({ name: '私有项目' })
      .expect(201);
    const stranger = await register('stranger@example.com');

    await request(httpServer())
      .get(`/api/projects/${(projectResponse.body as EntityResponseBody).id}`)
      .set('Authorization', `Bearer ${stranger.accessToken}`)
      .expect(404);
  });

  it('健康检查、Swagger 与所有错误入口都保留安全 requestId', async () => {
    await request(httpServer())
      .get('/api/health/live')
      .expect(200)
      .expect(({ body }: { body: { status: string } }) => {
        expect(body.status).toBe('ok');
      });
    await request(httpServer())
      .get('/api/health/ready')
      .expect(200)
      .expect(({ body }: { body: { status: string } }) => {
        expect(body.status).toBe('ok');
      });
    await request(httpServer())
      .get('/api/docs')
      .expect(200)
      .expect('content-type', /html/);

    const malformed = await request(httpServer())
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .set('x-request-id', 'malformed-json-test')
      .send('{broken')
      .expect(400);
    const malformedBody = malformed.body as { requestId: string };
    expect(malformed.headers['x-request-id']).toBe('malformed-json-test');
    expect(malformedBody.requestId).toBe('malformed-json-test');

    const unknown = await request(httpServer()).get('/outside-api').expect(404);
    const unknownBody = unknown.body as { requestId: string };
    expect(unknown.headers['x-request-id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(unknownBody.requestId).toBe(unknown.headers['x-request-id']);

    const unsafe = await request(httpServer())
      .get('/api/missing')
      .set('x-request-id', 'x'.repeat(129))
      .expect(404);
    const unsafeBody = unsafe.body as { requestId: string };
    expect(unsafe.headers['x-request-id']).not.toBe('x'.repeat(129));
    expect(unsafeBody.requestId).toBe(unsafe.headers['x-request-id']);
  });

  it('数据库失联时 readiness 保留 Terminus 标准 503 结构', async () => {
    if (!app) throw new Error('E2E application is not initialized');
    await app.get(DataSource).destroy();

    await request(httpServer())
      .get('/api/health/ready')
      .expect(503)
      .expect(({ body }: { body: Record<string, unknown> }) => {
        expect(body).toMatchObject({
          status: 'error',
          error: { database: { status: 'down' } },
          details: { database: { status: 'down' } },
        });
        expect(body).not.toHaveProperty('statusCode');
      });
  });
});
