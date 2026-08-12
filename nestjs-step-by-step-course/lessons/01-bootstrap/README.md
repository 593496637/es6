# 第 01 课：应用是怎样启动的

## 学习目标

- 能按顺序解释 `main.ts -> AppModule -> AppController`。
- 知道创建应用和监听端口是两件事。
- 能独立增加一个最简单的 GET 路由。

## 这节课解决什么问题

暂时不做任务系统，只回答三个问题：谁创建应用、谁声明 Controller、谁真正开放端口。

## 先建立心智模型

```text
main.ts → NestFactory.create(AppModule) → 读取 Controller → listen(3000)
```

- `main.ts` 是启动入口。
- `AppModule` 是装配清单，不是业务逻辑。
- `AppController` 把 `GET /` 映射到一个方法。

## 课堂练习

```bash
npm run lesson -- 01
curl http://localhost:3000
```

预期得到：

```json
{ "message": "NestJS 课程开始了" }
```

按调用顺序阅读 `src/main.ts`、`src/app.module.ts`、`src/app.controller.ts`。本课只有三个文件，要求能逐行解释。

把响应消息改成自己的名字，再增加 `GET /status` 返回 `{ "status": "ok" }`。修改前先说出要改哪一个文件，验证后再看答案。

## 常见错误

- 只运行 `src/main.ts` 而忘记在课程根目录安装依赖。
- 改了方法名，却误以为方法名决定 URL；真正决定 URL 的是装饰器。
- 忘记停止上一课，下一课启动时报端口占用。

## 自测题

- `NestFactory.create()` 和 `listen()` 有什么区别？
- 为什么 Controller 必须出现在 Module 的元数据里？
- `@Get()` 为什么表示根路径？

能脱离讲义回答后再学第 02 课。

## 完成标准

- curl 能得到预期 JSON。
- 你能不看代码画出三个文件的调用关系。
- 你能解释为什么没有 `listen()` 就没有可访问的 HTTP 服务。
