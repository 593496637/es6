# NestJS 课程导航

整套课程共 17 课。建议每次只学一课：先用自己的话回答心智模型问题，再读指定代码、运行请求、完成练习和验收清单。

| 课次 | 主题                                                                        | 学完后的能力                                      |
| ---- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| 00   | [课程使用指南](./docs/lessons/00-course-guide.md)                           | 认识项目、学习方法和请求主线                      |
| 01   | [启动与入口](./docs/lessons/01-bootstrap.md)                                | 解释 `main.ts` 如何启动根模块                     |
| 02   | [Controller 与路由](./docs/lessons/02-controller-routing.md)                | 设计 REST 路由并读取各类参数                      |
| 03   | [Provider 与依赖注入](./docs/lessons/03-provider-di.md)                     | 把业务逻辑从 Controller 分离到 Service            |
| 04   | [Module 边界](./docs/lessons/04-module-boundaries.md)                       | 理解 imports、providers、controllers、exports     |
| 05   | [CRUD 与仓储边界](./docs/lessons/05-memory-crud-and-repository-boundary.md) | 从内存 CRUD 演进到可替换 Repository               |
| 06   | [DTO、校验与 Pipe](./docs/lessons/06-dto-validation-pipes.md)               | 在系统边界拒绝非法输入                            |
| 07   | [异常与 Filter](./docs/lessons/07-exceptions-filter.md)                     | 返回一致且可追踪的错误                            |
| 08   | [完整请求生命周期](./docs/lessons/08-request-lifecycle.md)                  | 分清 Middleware、Guard、Pipe、Interceptor、Filter |
| 09   | [配置管理](./docs/lessons/09-config.md)                                     | 校验环境变量并隔离配置                            |
| 10   | [TypeORM、SQLite 与迁移](./docs/lessons/10-typeorm-sqlite-migrations.md)    | 使用 Entity、Repository 和 Migration 持久化       |
| 11   | [注册、登录与 JWT](./docs/lessons/11-auth-jwt.md)                           | 安全存储密码并签发/验证 Token                     |
| 12   | [认证与资源授权](./docs/lessons/12-authorization-guards.md)                 | 区分 401/403/404 并实现所有权隔离                 |
| 13   | [查询、筛选与分页](./docs/lessons/13-querying-pagination.md)                | 构建稳定、可校验的列表 API                        |
| 14   | [Swagger/OpenAPI](./docs/lessons/14-swagger.md)                             | 让 API 可发现、可交互                             |
| 15   | [单元与 E2E 测试](./docs/lessons/15-testing.md)                             | Mock 依赖并验证完整 HTTP 流程                     |
| 16   | [生产准备](./docs/lessons/16-production.md)                                 | 理解 Helmet、CORS、限流、日志和健康检查           |

## 推荐节奏

- 第一阶段（00–04）：先建立 Nest 的结构化思维。
- 第二阶段（05–08）：做出可靠的 HTTP CRUD，理解一次请求经历什么。
- 第三阶段（09–13）：加入真实配置、数据库、认证授权与查询能力。
- 第四阶段（14–16）：让 API 可文档化、可验证、可运行。

完成一课的标准不是“代码看过了”，而是你能不看讲义解释设计理由，并独立完成该课练习。遇到不懂的地方，带着课次、代码路径和具体问题来问；这样我可以继续陪你逐课学习。
