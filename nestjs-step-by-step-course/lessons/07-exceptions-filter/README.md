# 第 07 课：异常与统一错误响应

## 学习目标

- 区分业务层抛异常和边界层序列化响应。
- 理解 Exception Filter 只处理未捕获异常。
- 能设计稳定且不泄露内部信息的错误结构。

## 这节课解决什么问题

业务层应该抛出“发生了什么”，而不是自己拼 HTTP JSON。本课保留上一课的 DTO，只新增一个全局 Exception Filter，把不同异常统一成可观察的响应。

## 本课新增

- `NotFoundException` 仍由 Service 表达业务失败。
- `HttpExceptionFilter` 负责 HTTP 状态码、路径和时间。
- 未知错误不把内部堆栈直接暴露给客户端。

## 请求经过哪里

```text
请求 -> ValidationPipe -> Controller -> Service
                                  抛异常 |
响应 <- Exception Filter <-------------+
```

按顺序读：`tasks.service.ts`、`common/http-exception.filter.ts`、`main.ts`。

## 运行与观察

```bash
npm run lesson -- 07
curl -i http://localhost:3000/tasks/999
curl -i http://localhost:3000/tasks/not-a-number
```

比较两个 400/404 响应：来源不同，但都包含 `statusCode`、`message`、`path`、`timestamp`。

## 为什么 Filter 不写在 Service

Service 可能被 HTTP、定时任务或消息消费者复用。将 HTTP 序列化留在边界层，业务代码才能被复用和测试。

## 课堂练习

在 Service 中拒绝重复标题并抛出 `ConflictException`，确认 Filter 不需要修改就能返回 409。

## 常见错误

- 在每个 Controller 中重复 `try/catch` 和拼 JSON。
- 把未知错误的 stack 直接返回客户端。
- 以为 Filter 会在正常响应路径执行；正常响应由 Interceptor 等其他边界处理。

## 自测题

- `NotFoundException` 的状态码从哪里来？
- 验证失败和 Service 失败为何能进入同一个 Filter？
- 为什么 Service 不应该知道 `timestamp` 和 `request.url`？

## 完成标准

- 你能指出异常在哪里产生、在哪里转成响应。
- 你能解释为何未知错误不应返回真实堆栈。

## 官方延伸阅读

- [NestJS Exception filters](https://docs.nestjs.com/exception-filters)
