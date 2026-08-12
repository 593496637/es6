# 第 16 课：E2E 测试——穿过真实 HTTP 与数据库

## 学习目标

- 启动完整 Nest 应用并通过 Supertest 发送请求。
- 让真实启动与测试共用 HTTP 边界配置。
- 用独立内存数据库消除测试顺序依赖。

## 它与单元测试证明的东西不同

E2E 测试启动完整 Nest 应用，通过 Supertest 发送真实 HTTP 请求，穿过 Middleware、Guard、Pipe、Controller、Service、Repository 和 SQLite。

```text
Supertest -> Nest HTTP -> Guard/Pipe -> Controller -> Service -> :memory: SQLite
```

## 本课覆盖的核心故事

1. 匿名访问受保护资源得到 401。
2. 用户注册并拿到 token。
3. 携带 token 创建自己的项目。
4. 在项目中创建任务并分页查询。

每个测试都创建自己的 `:memory:` 数据库和 Nest 应用，与开发文件及其他测试隔离；`afterEach` 关闭应用，避免连接句柄泄漏。

## 运行

```bash
npm run lesson:test -- 16
```

## 为什么不只写 E2E

E2E 更接近用户，但更慢、失败定位更宽。单元测试快速锁定业务分支，E2E 证明组件接线和关键故事。两者是互补关系。

## 关于测试独立性

每个 `it` 必须能单独运行。第三个测试虽然重复注册和创建项目，看起来多写了一点，但换来了无顺序依赖：你可以只运行它，也可以任意调整测试顺序。重复的注册步骤被提取成辅助函数，但业务断言仍留在各自测试里。

## 课堂练习

注册第二个用户，证明它访问第一个用户的项目得到 404；再补非法 UUID、错误 token、重复邮箱和删除级联场景。

## 常见错误

- E2E 手工配置一套与 `main.ts` 不同的 Pipe/Filter。
- 多个 `it` 共用静态邮箱和可变数据库，单独运行就失败。
- 忘记关闭 Nest app，Jest 报 open handles。
- 用 E2E 覆盖每个细小分支，导致测试又慢又难定位。

## 自测题

- 单元测试和 E2E 各能证明什么、不能证明什么？
- 为什么本课的 `beforeEach` 比 suite 级数据库更稳？
- `configureApp()` 如何防止测试与真实启动漂移？

## 完成标准

- 测试不读写开发数据库文件。
- `afterAll` 正确关闭 app。
- 你能解释一个 E2E 失败可能来自哪些层。

## 官方延伸阅读

- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
