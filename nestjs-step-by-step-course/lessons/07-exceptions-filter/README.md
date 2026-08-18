# 第 07 课：异常与统一错误响应

## 学习目标

- 区分业务层抛异常和边界层序列化响应。
- 理解 Exception Filter 只处理未捕获异常。
- 能设计稳定且不泄露内部信息的错误结构。

## 这节课解决什么问题

代码里到处都可能出错——查询不到东西、传的数据不对、程序内部逻辑写错了。如果每个地方都自己决定"出错了返回什么格式"，最后你的接口会给出一堆长得不一样的错误响应，调用你接口的人会很痛苦。这一课加一个"统一出错处理"的东西（Exception Filter），不管错误是从哪个角落抛出来的，最后都被它接住，转换成一个固定格式。

## 本课新增

- `NotFoundException` 还是由 Service 抛出来，表达"这次业务失败了"。
- `HttpExceptionFilter` 负责把异常整理成统一的 HTTP 状态码、路径、时间这些信息。
- 未知的、没预料到的错误，不会把内部的报错堆栈直接扔给客户端看。

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

Service 里的方法以后可能不止被 HTTP 调用，也可能被定时任务、消息队列这类东西调用。它只需要负责"发现问题就抛出去"，至于错误该拼成什么样的 HTTP 响应，应该交给边界层去处理——这样业务代码才能被别的场景复用，测试的时候也不用关心 HTTP 相关的细节。

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
