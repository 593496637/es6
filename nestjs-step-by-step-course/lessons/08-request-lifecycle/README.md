# 第 08 课：一次请求的完整生命周期

## 学习目标

- 能按顺序说出 Middleware、Guard、Interceptor、Pipe、Controller 和 Filter。
- 根据职责选择正确扩展点。
- 理解请求 ID 如何贯穿日志、响应头和错误响应。

## 这节课解决什么问题

学会 Controller 以后，最容易困惑的是 Middleware、Pipe、Interceptor、Filter 到底谁先谁后。本课只加入请求 ID 和耗时日志，用一次真实请求串起它们。

## 心智模型

```text
Middleware -> Guard -> Interceptor(before) -> Pipe -> Controller -> Service
     ^                                           |
     |             Filter <- 异常 ---------------+
     +------ Interceptor(after) <- 正常响应 -------+
```

本课还没有 Guard，它会在认证课出现。

## 本课新增

- Middleware：尽早生成并回写 `x-request-id`。
- Pipe：验证和转换输入。
- Interceptor：包住处理过程，记录耗时。
- Filter：发生异常时生成统一响应，并带同一个请求 ID。

## 运行

```bash
npm run lesson -- 08
curl -i -H 'x-request-id: lesson-08-demo' http://localhost:3000/tasks
curl -i -H 'x-request-id: lesson-08-demo' http://localhost:3000/tasks/999
```

同时观察响应头、错误 body 和终端日志中的 request ID。

## 重点理解

- Middleware 不知道最终会调用哪个 Controller，适合通用前置工作。
- Interceptor 能看到执行前后，适合日志、映射、缓存。
- Filter 只在异常路径工作。
- 请求 ID 必须限制长度和字符，不能无条件信任客户端输入。

## 课堂练习

在 LoggingInterceptor 中加入响应状态码；再发送一次成功和失败请求，解释为什么 `finalize` 两次都会运行。

## 常见错误

- 把所有横切逻辑都塞进 Middleware，忽略 Interceptor 能观察处理前后。
- 无条件信任客户端 request ID，造成日志污染或超长响应头。
- 把生命周期图理解成所有组件每次都会运行；发生未捕获异常后会直接跳向 Filter。

## 自测题

- 验证失败时 Service 会执行吗？
- Interceptor 的 before 与 after 顺序为何像洋葱？
- Filter 和 Interceptor 在异常路径上的职责有什么不同？

## 完成标准

你能不看答案说出：验证失败时哪些层已经执行，哪些业务代码不会执行。

## 官方延伸阅读

- [NestJS Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle)
