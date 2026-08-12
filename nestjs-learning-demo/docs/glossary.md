# NestJS / TaskFlow 术语表

## Nest 核心

| 术语                       | 初学者解释                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------- |
| NestJS                     | 构建 Node.js 服务端应用的 TypeScript 框架，重点提供模块、依赖注入和统一请求处理模型。 |
| Decorator（装饰器）        | `@Controller()`、`@Get()` 等附加元数据的语法；Nest 在运行时读取这些信息完成装配。     |
| Module                     | Nest 的装配与可见性边界，声明 imports、controllers、providers、exports。              |
| Controller                 | HTTP 适配层，把路由、参数和请求体翻译为 Service 调用。                                |
| Provider                   | 可由 Nest IoC 容器创建、解析和注入的依赖；Service 是常见 Provider。                   |
| Service                    | 承载业务用例和规则的惯用 Provider 角色，不应依赖具体 HTTP 响应对象。                  |
| Dependency Injection（DI） | 使用方声明需要什么，容器负责提供实例；便于替换实现与测试。                            |
| IoC Container              | 保存 Provider 注册信息并解析依赖图的 Nest 容器。                                      |
| imports                    | 当前 Module 要使用的其他 Module 公共能力。                                            |
| providers                  | 当前 Module 注册给 DI 容器的依赖。                                                    |
| controllers                | 当前 Module 拥有的 HTTP Controller。                                                  |
| exports                    | 当前 Module 明确允许其他 Module 注入的 Provider。                                     |

## HTTP 与请求生命周期

| 术语             | 初学者解释                                                        |
| ---------------- | ----------------------------------------------------------------- |
| REST             | 以资源和标准 HTTP 语义组织 API 的风格；例如 projects 与 tasks。   |
| Route            | HTTP method 与 path 的组合，例如 `GET /api/projects/:projectId`。 |
| Path parameter   | URL 路径中的必需标识，例如 `:projectId`。                         |
| Query parameter  | `?page=2&status=todo` 中的可选查询条件。                          |
| Request body     | POST/PATCH 常携带的 JSON 输入。                                   |
| Middleware       | 较早接触底层 request/response 的处理层；本项目用于 requestId。    |
| Guard            | 在 Controller 前决定请求能否继续；本项目用于限流和 JWT 认证。     |
| Pipe             | 转换和验证将传给 Controller 方法的参数。                          |
| Interceptor      | 包裹一次处理调用，可在前后观察或转换；本项目用于耗时日志。        |
| Exception Filter | 捕获异常并统一形成错误 HTTP 响应。                                |
| requestId        | 一次请求的关联标识，用于把客户端错误、响应头和服务端日志串起来。  |
| 400 Bad Request  | 输入结构、类型或取值不合法。                                      |
| 401 Unauthorized | 请求没有有效身份凭证；名字虽是 Unauthorized，含义通常是“未认证”。 |
| 403 Forbidden    | 身份有效，但无权执行当前动作。                                    |
| 404 Not Found    | 资源不存在；也可用于不暴露他人资源是否存在。                      |
| 409 Conflict     | 请求与现有状态冲突，例如邮箱已注册。                              |

## 数据契约与持久化

| 术语              | 初学者解释                                                                      |
| ----------------- | ------------------------------------------------------------------------------- |
| DTO               | Data Transfer Object，描述某个 API 输入允许的字段与校验规则；本项目使用 class。 |
| ValidationPipe    | 将 class-validator 规则应用到输入的 Nest Pipe。                                 |
| whitelist         | 只接受 DTO 中声明的字段。                                                       |
| transform         | 把 HTTP 字符串输入转换成 DTO 所需类型，例如 query 数字。                        |
| Entity            | TypeORM 中描述类与数据库表映射的对象。                                          |
| Repository        | 面向某个 Entity 的查询与保存入口，也是 Service 与持久化之间的边界。             |
| ORM               | Object-Relational Mapper，把对象操作映射到关系数据库。                          |
| DataSource        | TypeORM 的连接、Entity 和 Migration 配置中心。                                  |
| Migration         | 可追踪的数据库结构变更，`up` 前进、`down` 回退。                                |
| `synchronize`     | TypeORM 自动按 Entity 改表的选项；本项目关闭它并使用 Migration。                |
| Primary key       | 表中唯一识别记录的键，本项目使用 UUID id。                                      |
| Foreign key       | 约束表之间关系的键，例如 tasks.projectId。                                      |
| Unique constraint | 保证值唯一的数据库约束，例如 users.email。                                      |
| Index             | 加速特定查询的数据库结构，但会增加写入和存储成本。                              |
| Cascade delete    | 删除父记录时由外键规则删除子记录；使用前必须理解数据影响。                      |
| SQLite            | 单文件关系数据库，适合学习和单机工具，但不适合所有多实例生产场景。              |

## 身份与安全

| 术语                   | 初学者解释                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| Authentication（认证） | 证明“你是谁”；本项目由 JWT Guard 完成后续请求认证。                 |
| Authorization（授权）  | 决定“你能对这个资源做什么”；本项目按项目 owner 检查。               |
| Password hash          | 密码经单向算法得到的验证值；不能保存或回显明文密码。                |
| bcrypt                 | 带盐且故意较慢的密码哈希算法，本项目使用 bcryptjs 实现。            |
| JWT                    | 带签名的紧凑 token；payload 通常可读，不应存放秘密。                |
| Bearer token           | 放在 `Authorization: Bearer <token>` 中的访问凭证；持有者可使用它。 |
| JWT payload            | token 中的声明数据；`sub` 通常表示用户 ID。                         |
| `@Public()`            | 本项目的自定义元数据，标记可跳过 JWT 认证的少数路由。               |
| `@CurrentUser()`       | 从已经认证的 request 上读取用户上下文的自定义参数装饰器。           |
| CORS                   | 浏览器跨源访问策略；服务端应明确允许来源。                          |
| Helmet                 | 为 HTTP 响应设置一组常用安全头的中间件。                            |
| Rate limiting          | 限制时间窗口内请求数量，降低滥用风险。                              |

## 查询、文档、测试与运行

| 术语              | 初学者解释                                                           |
| ----------------- | -------------------------------------------------------------------- |
| Pagination        | 把大列表分成多页；本项目返回 data 和 meta。                          |
| Offset pagination | 使用 skip/take（偏移/数量）的分页；简单但大数据与频繁变动时有局限。  |
| Stable sort       | 排序值相同时仍用次级键固定顺序，减少跨页重复或遗漏。                 |
| OpenAPI           | 描述 HTTP API 的机器可读规范。                                       |
| Swagger UI        | 把 OpenAPI 文档呈现为可浏览、可试请求的网页。                        |
| Unit test         | 隔离外部依赖测试一个 Service 等小单元，快且易定位故障。              |
| Mock / Fake       | 测试中替代真实依赖的可控实现；mock 常关注调用，fake 常提供简化行为。 |
| E2E test          | 从 HTTP 入口经过真实应用装配验证完整流程的端到端测试。               |
| Supertest         | 在测试中向 Node HTTP 应用发送请求并断言响应的库。                    |
| Liveness          | 进程是否还能响应；失败通常意味着应重启实例。                         |
| Readiness         | 实例及关键依赖是否已准备接收流量；本项目会检查数据库。               |
| Graceful shutdown | 收到终止信号后停止接新工作并释放数据库等资源。                       |

遇到陌生词时，不必一次背完。先回到具体请求，问它在“输入、身份、业务、数据、响应、运行”哪一段解决问题。
