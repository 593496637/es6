# 第 03 课：Provider 与依赖注入

## 学习目标

- 理解 Provider 是由 Nest 容器创建和管理的对象。
- 能沿 `Controller -> Service` 追踪一次调用。
- 能解释依赖注入怎样降低 Controller 与具体实现的耦合。

## 上一课为什么不够好

上一课的问题是，Controller 一个类既要懂"这是个 HTTP 请求"，又要懂"项目数据该怎么存、怎么改"。这两件事混在一起，以后想把数据存到数据库、或者想让另一个入口复用这份逻辑，就会很难改。

## 本课核心

这一课把"怎么处理项目数据"这件事挪到一个新类 `ProjectsService` 里：`@Injectable()` 告诉 Nest 这个类可以交给它管理，Module 在 `providers` 里登记一下，Controller 只需要在构造函数里声明"我需要一个 ProjectsService"就能用。

```text
HTTP → AppController → ProjectsService → 内存数组
```

关键的地方是：Controller 并不是自己 `new` 一个 Service 出来用的，而是 Nest 自动把已经准备好的实例递给它——这个自动递送的过程就叫"依赖注入"。好处是 Controller 完全不用关心 Service 是怎么造出来的，它只管用。

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
