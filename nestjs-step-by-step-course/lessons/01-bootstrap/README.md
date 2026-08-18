# 第 01 课：应用是怎样启动的

> 还没接触过 Nest CLI、不清楚 `package.json`/`node_modules`/`tsconfig.json` 是干嘛的，先看 [第 00 课](../../docs/00-cli-and-project-anatomy.md)。这一课直接从三个写好的文件开始，不会再解释它们从哪来。

## 学习目标

- 能按顺序解释 `main.ts -> AppModule -> AppController`。
- 知道创建应用和监听端口是两件事。
- 能独立增加一个最简单的 GET 路由。

## 这节课解决什么问题

写一个后端服务，最起码要有三件事：一个入口负责把程序跑起来，一个地方登记"这个程序里有哪些功能"，还要有个东西真正去接收网络请求。这一课先不碰任务系统，就把这三件事搞清楚：谁创建应用、谁声明 Controller、谁真正打开端口对外提供服务。

## 先建立心智模型

```text
main.ts → NestFactory.create(AppModule) → 读取 Controller → listen(3000)
```

`main.ts` 是程序真正开始执行的地方，`NestFactory.create()` 把整个应用搭起来，`listen(3000)` 才让它开始监听端口——这是两个动作，"搭好应用"和"真正开始接收请求"是分开的，只搭不 `listen`，浏览器照样访问不到。

`AppModule` 只是一份清单，告诉 Nest "这个程序里有 AppController 这个东西"，它自己不写业务逻辑。

`AppController` 才是真正处理请求的地方，`GET /` 这个路径最终会落到它的某个方法上。

## 课堂练习

```bash
npm run lesson -- 01
curl http://localhost:3000
```

预期得到：

```json
{ "message": "NestJS 已经启动，我的第一条路由成功了！" }
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
