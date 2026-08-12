# NestJS 课程术语表

学习时不必一次背完。遇到陌生词先回到对应课程，再用本页确认边界。

| 术语                 | 一句话解释                                                 | 首次出现     |
| -------------------- | ---------------------------------------------------------- | ------------ |
| Bootstrap            | 创建 Nest 应用并开始监听的启动过程                         | 第 01 课     |
| Controller           | 将 HTTP method/path 映射到方法的边界类                     | 第 01 课     |
| Decorator            | 附加元数据或行为声明的 `@...` 语法                         | 第 01 课     |
| Provider             | 由 Nest 容器创建、注入和管理的对象                         | 第 03 课     |
| Dependency Injection | 类声明需要什么，由容器提供实例                             | 第 03 课     |
| Module               | 组合 imports、controllers、providers、exports 的运行时边界 | 第 04 课     |
| Pipe                 | 在 Controller 方法执行前转换或验证输入                     | 第 05～06 课 |
| DTO                  | 描述进入系统的数据合同，不是数据库表                       | 第 06 课     |
| Exception Filter     | 将未捕获异常转换成 HTTP 响应                               | 第 07 课     |
| Middleware           | 路由处理前执行的底层 HTTP 前置逻辑                         | 第 08 课     |
| Interceptor          | 包裹 Controller 调用，观察执行前后                         | 第 08 课     |
| Entity               | ORM 用来描述数据库表映射的类                               | 第 10 课     |
| Repository           | 封装实体查询和持久化操作的数据库边界                       | 第 10 课     |
| Migration            | 可审查、按顺序执行的数据库结构变更历史                     | 第 11 课     |
| Authentication       | 确认“你是谁”                                               | 第 12 课     |
| Authorization        | 决定“你能做什么”                                           | 第 13 课     |
| JWT                  | 服务端签名、客户端携带的身份凭证                           | 第 12 课     |
| Guard                | 在 Controller 前决定请求能否继续                           | 第 13 课     |
| OpenAPI/Swagger      | 描述并展示 HTTP API 合同                                   | 第 14 课     |
| Unit test            | 隔离依赖后验证一个小单元的行为                             | 第 15 课     |
| E2E test             | 从真实 HTTP 入口穿过完整应用链路                           | 第 16 课     |
| Liveness             | 进程是否仍能响应                                           | 第 17 课     |
| Readiness            | 依赖是否就绪、实例能否接收流量                             | 第 17 课     |

## 最容易混淆的三组概念

### DTO 与 Entity

DTO 保护 HTTP 输入边界；Entity 描述持久化模型。它们可能暂时有相同字段，但变化原因和暴露范围不同。

### Middleware、Guard、Pipe、Interceptor、Filter

```text
Middleware -> Guard -> Interceptor(before) -> Pipe -> Controller
                  正常响应 -> Interceptor(after)
                  未捕获异常 -> Filter
```

### 认证与授权

JWT 验签说明凭证有效，属于认证；检查 project.ownerId 是否等于当前用户，属于授权。认证成功不代表可以访问任意资源。
