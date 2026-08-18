# 第 17 课：从可运行项目到部署基线

## 学习目标

学完本课，你应该能：

- 区分“业务功能完成”和“可以被平台可靠运行”。
- 解释 Helmet、CORS、限流、健康探针和优雅退出各解决什么问题。
- 解释为什么开发时自动 migration，生产多实例时应使用独立迁移任务。
- 用 E2E 证明健康检查公开且数据库已经就绪。

## 上一课留下的问题

前面 16 课已经把功能都做完了，这一课要解决的是"这个程序能不能被安全、稳定地部署到线上"——这跟业务逻辑没关系，是另一层需要考虑的东西：部署平台还不知道应用是不是健康的，响应也没有基本的安全防护，接口也没做限流。不要把这些当成业务 Service 该管的事。

先比较增量：

```bash
npm run lesson:diff -- 17
```

本课保持第 16 课的目录结构，只增加少量部署边界。完整的工程化成品仍在 `../nestjs-learning-demo`，不会在这里突然替换整套代码。

## 本课新增的调用关系

```text
请求
  -> Helmet / CORS
  -> ThrottlerGuard
  -> JwtAuthGuard
  -> Controller / Service / Repository

部署平台
  -> GET /health/live   进程能否响应
  -> GET /health/ready  数据库是否可用
```

Guard 的注册顺序有意义：先做通用限流，再验证 JWT。健康路由虽然 `@Public()` 跳过 JWT，但仍受到全局限流保护。

## 第一步：统一真实启动与 E2E 配置

阅读 `src/app.setup.ts`。`configureApp()` 同时被 `main.ts` 和 E2E 调用，防止测试应用忘记安装 ValidationPipe、Filter、Helmet 或 CORS。最终课关闭 Nest 默认 body parser，再按“request ID -> Helmet -> CORS -> JSON parser”的顺序显式安装，因此畸形 JSON 的 400 也带追踪 ID。

这条原则很重要：如果测试启动方式与生产启动方式不同，绿色 E2E 也可能只证明了另一套应用。

## 第二步：安全 HTTP 边界

这一步加了几样跟业务逻辑无关、但上线前该有的东西：

- Helmet 给响应加上一些常用的安全响应头，但它不是权限系统，不负责判断谁能访问什么。
- CORS 控制的是"浏览器能不能从指定的网站来源读取这个响应"，不会阻止 curl 或服务器之间的请求。
- Throttler 限制同一个来源短时间内能发多少次请求，能降低被刷、被暴力破解的风险，但不能代替账号锁定或专门的防护设备。

全局示例是每分钟 100 次，而注册和登录用 `@Throttle()` 收紧为每分钟 5 次。真实系统还应结合账号维度、共享存储和告警，不能只靠单机 IP 计数。

多实例部署时，内存限流状态不会自动共享，应接入 Redis 等共享存储。反向代理后还要按真实拓扑配置可信代理，否则基于 IP 的限流可能识别错客户端；不要为了“能用”直接信任所有代理。

课程用 `TRUST_PROXY` 显式配置代理范围，空值表示不信任代理转发地址。`SWAGGER_ENABLED=false` 可以关闭文档端点；教学默认开启，真实生产按暴露策略决定。

## 第三步：健康探针

```bash
npm run lesson -- 17
curl http://localhost:3000/health/live
curl http://localhost:3000/health/ready
```

预期核心响应：

```json
{ "status": "ok" }
```

`live` 只说明进程能响应；`ready` 会 ping 数据库。数据库短暂不可用时，平台可以停止向该实例分配流量，而不必立即把整个进程当作崩溃。

## 第四步：Migration 策略

课程默认 `DB_MIGRATIONS_RUN=true`，适合本地单进程练习。生产多副本应设为 `false`，由发布流程中的单独任务只执行一次 migration，再启动新版本实例，避免多个副本并发改表。

TypeORM 官方也明确警告 `synchronize: true` 不应在生产使用。本课程从第 11 课开始已经使用 Migration，最终课只是把“何时执行”变成部署决策。

## 第五步：优雅退出

`enableShutdownHooks()` 让 Nest 响应进程终止信号并执行关闭生命周期，从而给数据库连接等资源清理机会。它不保证任意长任务一定完成，部署平台仍需提供合理的 termination grace period。

## 运行测试

```bash
npm run lesson:test -- 17
```

除了第 16 课的业务故事，本课新增健康检查 E2E。注意 E2E 使用 `:memory:` SQLite，不会写开发数据库。

## 常见错误

- CORS 不是后端权限控制。
- `/live` 返回 200 不代表数据库可用。
- 单实例内存限流不等于集群限流。
- Swagger 方便学习和联调，但生产是否公开应由配置或网关策略决定。
- 在 JSON parser 之后才生成 request ID，会让解析失败请求失去追踪信息。
- `migrationsRun: true` 方便本地，不等于适合多实例发布。

## 课堂练习

1. 用 `curl -I http://localhost:3000/health/live` 找出 Helmet 添加的两个响应头。
2. 暂时把 readiness 中的数据库检查换成一个抛错函数，观察状态码和响应，再恢复代码。
3. 设置 `DB_MIGRATIONS_RUN=false` 并使用空内存库启动，解释为什么失败或接口不可用是合理结果。

## 进阶练习

设计一个 PostgreSQL 迁移计划，只写清单，不急着改代码：驱动、列类型、唯一约束错误码、Migration、测试容器、备份与回滚分别要改什么？只改 TypeORM 的 `type` 不算迁移完成。

## 自测题

- 为什么 `configureApp()` 要被 main 和 E2E 共用？
- liveness 和 readiness 各由谁消费、失败时平台应做什么？
- 为什么多实例不能都在启动时自动跑 migration？
- Helmet、CORS、Guard、限流分别位于哪一类安全边界？

## 完成标准

- 17 课测试全部通过。
- 你能从 HTTP 请求一路解释到数据库，也能说清 DTO、Entity、Migration、Guard、Pipe、Interceptor、Filter、单元测试和 E2E 的边界。
- 不看最终成品，你能从第 01 课逐步复写主要结构，并解释每次新增是为了解决什么问题。

## 官方延伸阅读

- [NestJS Deployment](https://docs.nestjs.com/deployment)
- [NestJS Helmet](https://docs.nestjs.com/security/helmet)
- [NestJS CORS](https://docs.nestjs.com/security/cors)
- [NestJS Rate limiting](https://docs.nestjs.com/security/rate-limiting)
