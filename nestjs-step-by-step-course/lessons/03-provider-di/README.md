# 第 03 课：Provider 与依赖注入

## 学习目标

- 理解 Provider 是由 Nest 容器创建和管理的对象。
- 能沿 `Controller -> Service` 追踪一次调用。
- 能解释依赖注入怎样降低 Controller 与具体实现的耦合。

## 上一课为什么不够好

Controller 同时理解 HTTP 和项目数据。以后改成数据库或被其他入口复用时，会很难维护。

## 本课核心

新增 `ProjectsService`，用 `@Injectable()` 告诉 Nest 它可以由容器管理；Module 在 `providers` 注册；Controller 通过构造器声明依赖。

```text
HTTP → AppController → ProjectsService → 内存数组
```

这里的“注入”不是 Controller 自己 `new ProjectsService()`，而是容器创建并传入实例。

## 动手

```bash
npm run lesson -- 03
curl -X POST http://localhost:3000/projects \
  -H 'Content-Type: application/json' -d '{"name":"DI 练习"}'
curl http://localhost:3000/projects
```

## 重点比较

比较第 02、03 课的 `app.controller.ts`，再看新增的 `projects.service.ts` 和 Module 的 `providers`。

## 课堂练习

给 Service 增加 `remove(id)`，Controller 只负责转交 id。

## 常见错误

- 新建 Service 后忘记加入 Module 的 `providers`。
- 在 Controller 中手工 `new ProjectsService()`，绕开 Nest 容器。
- 把 `@Injectable()` 理解为“自动全局可用”；它仍需被模块注册或导入。

## 自测题

- 为什么不用 `new ProjectsService()`？
- `@Injectable()`、`providers`、构造器参数各自做什么？
- 哪一层应该知道 HTTP，哪一层应该知道项目规则？

## 完成标准

- POST 后 GET 能读到同一个 Service 实例保存的数据。
- Controller 中没有项目数组和创建规则。
- 你能口述容器何时知道如何构造 Controller。
