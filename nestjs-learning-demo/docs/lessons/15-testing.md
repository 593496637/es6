# 第 15 课：单元测试与 E2E 测试

## 本课目标

- 区分单元测试与 E2E 测试各自提供的信心。
- 用 Nest TestingModule 替换 Repository 依赖，快速测试 Service 分支。
- 用 Supertest 验证完整 HTTP、认证、校验与数据库链路。

## 心智模型

测试不是数量竞赛，而是用不同边界定位风险：

```text
Service 单元测试
  输入 → 业务逻辑 → mock/fake 依赖
  快、定位准

HTTP E2E 测试
  请求 → 全局 Pipe/Guard/Filter → Controller/Service → 测试数据库
  慢一些，但验证真实装配
```

## 最终项目文件导航

- `src/modules/tasks/tasks.service.spec.ts`：TasksService 单元测试与 Repository mock。
- `test/app.e2e-spec.ts`：认证、项目/任务 CRUD、校验、权限、健康检查及关键失败路径。
- `test/jest-e2e.json`：E2E Jest 配置。
- `test/setup-env.ts`：测试专用环境变量。
- `src/modules/tasks/tasks.service.ts`：被测业务分支。
- `src/app.module.ts`：E2E 使用的真实应用装配与测试库策略。
- `package.json`：`test`、`test:e2e`、`test:cov` 命令。

## 核心讲解

Service 单测用 `Test.createTestingModule()` 提供被测 Service，并以 `getRepositoryToken(Task)` 对应的 mock 替换真实 Repository。ProjectsService 也可用 fake 替换，从而明确测试“项目所有权检查是否调用”和“任务查询条件是否正确”。

不要 mock 被测方法内部所有细节。测试可观察行为：返回值、抛出的异常、关键依赖调用参数。比如 findOne 必须用 `{ id: taskId, projectId }`，这是防止嵌套资源越界的重要条件。

E2E 为每条用例创建真实 Nest 应用和全新的内存数据库，经全局 `/api` 前缀、ValidationPipe、Guard、Filter 发送请求。当前覆盖注册与登录、无效认证、项目/任务 CRUD、分页边界、输入校验、资源所有权、Swagger、健康检查及 readiness 失败结构。结束时关闭 app，因此测试不依赖顺序，也不会污染开发数据库。

## 动手步骤与练习

1. 运行 `npm test`，阅读一个 TasksService 测试的 arrange/act/assert。
2. 故意把 mock 的返回改成 null，预测 Service 应抛什么异常，再恢复。
3. 运行 `npm run test:e2e`，追踪 accessToken 与资源 ID 如何在请求间传递。
4. 为项目列表增加分页后，补充其分页边界 E2E 断言。
5. 为 JWT 加入撤销或 token version 后，补充账号失效场景；说明它为何适合由 E2E 验证。

## 验收清单

- [ ] `npm test` 与 `npm run test:e2e` 均通过。
- [ ] Service 单测不连接真实开发数据库。
- [ ] E2E 经过真实全局 Pipe、Guard 与路由。
- [ ] 测试可独立重复运行，结束后关闭应用。
- [ ] 成功主线和关键失败分支都有证据。

## 常见误区

- **只有 Controller 单测**：很难覆盖核心业务与查询约束。
- **所有依赖都真实运行**：单测会变慢且故障定位困难。
- **E2E 使用开发数据库**：可能破坏数据且产生顺序依赖。
- **追求 100% 行覆盖而忽略风险**：优先覆盖权限、校验、冲突和状态边界。

## 下一课

测试证明了行为；最后一课检查安全中间件、限流、健康检查、优雅关闭、迁移和部署前门槛。
