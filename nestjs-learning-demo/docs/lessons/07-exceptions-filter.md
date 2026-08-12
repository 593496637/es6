# 第 07 课：异常与 Exception Filter

## 本课目标

- 用合适的 HTTP 异常表达不同失败原因。
- 理解“抛出异常”如何中断正常链路并交给 Filter。
- 看懂统一错误响应，并避免泄露内部细节。

## 心智模型

正常结果沿 Controller 返回；异常则跳出正常路径，由最近适用的 Exception Filter 转换为 HTTP 响应。

```text
Service 抛出 NotFoundException
  → Controller 不再继续
  → HttpExceptionFilter
  → { statusCode, error, message, path, timestamp, requestId }
```

Filter 统一“如何呈现错误”，Service 决定“什么情况是错误”。

## 最终项目文件导航

- `src/common/filters/http-exception.filter.ts`：统一异常格式与未知错误保护。
- `src/app.module.ts`：通过 `APP_FILTER` 全局注册 Filter。
- `src/modules/projects/projects.service.ts`：404、403 等业务失败来源。
- `src/modules/tasks/tasks.service.ts`：资源归属与不存在错误。
- `src/modules/auth/auth.service.ts`：重复邮箱、凭证错误等失败。
- `src/common/middleware/request-id.middleware.ts`：错误响应关联的 requestId 来源。

## 核心讲解

常用状态码应保持语义稳定：

- 400：输入结构或取值不合法。
- 401：没有有效身份凭证。
- 403：身份有效，但无权执行动作。
- 404：目标资源不存在，或安全策略选择不暴露其存在性。
- 409：唯一约束冲突，例如邮箱已注册。
- 500：未预期的内部错误。

Filter 对已知 `HttpException` 保留安全消息，对未知异常返回通用 500 文案；堆栈和数据库细节应记录到受控日志，而不是响应给客户端。

错误响应的一致性让前端、测试和监控都能可靠消费。requestId 把客户端看到的失败与服务端日志关联起来。成功响应无需被本项目的错误 Filter 包装。

## 动手步骤与练习

1. 请求一个不存在的 taskId，记录状态码和错误字段。
2. 用错误密码登录得到 401；再用另一用户访问项目，观察本项目为何用 404 隐藏资源存在性，而不是返回 403。
3. 注册重复邮箱，观察 409；确认响应没有 passwordHash 或堆栈。
4. 从 requestId Middleware 追到 Filter 的响应体。
5. 练习：为五种失败场景选择 400/401/403/404/409，并解释选择。

## 验收清单

- [ ] 我能区分 401、403、404 和 409。
- [ ] 错误响应包含 path、timestamp、requestId 等稳定字段。
- [ ] 未知错误不会向客户端泄露内部堆栈。
- [ ] 我知道 Filter 不负责决定业务规则。

## 常见误区

- **所有失败都抛 BadRequestException**：客户端无法准确处理。
- **Controller 到处 try/catch**：重复格式化逻辑会变得不一致。
- **把原始数据库错误直接返回**：可能泄露表名、SQL 和约束细节。
- **吞掉异常并返回 undefined**：最终会得到难以理解的成功或序列化结果。

## 下一课

现在已经见过 Pipe 和 Filter；下一课把 Middleware、Guard、Interceptor、Pipe、Controller、Filter 放进完整请求生命周期。
