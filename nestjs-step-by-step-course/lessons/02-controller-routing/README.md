# 第 02 课：Controller 与路由

## 学习目标

- 理解 HTTP method 与 path 怎样定位 Controller 方法。
- 区分路径参数和 JSON body。
- 能根据需求选择 GET、POST 或 DELETE。

## 上一课留下的问题

第 01 课只有一个固定返回值的 `GET /`。真实的接口要能根据你访问的路径、或者你发过去的数据做出不同反应，这一课就教你怎么从请求里"抠"出这些信息。

## 本课只增加什么

- `@Get('projects')`：这次要处理的 HTTP method 和路径。
- `@Param('id')`：从路径里取变量，比如 `/projects/p-99` 里的 `p-99`。
- `@Body()`：从请求体里取 JSON，比如 POST 过去的 `{ name: "xxx" }`。
- `@Post()`：创建资源用的方法。

```text
POST /projects + { name }
  → AppController.create(body)
  → 返回创建结果
```

这一课的数据还是写死在代码里的，POST 之后再 GET 是看不到新数据的——这是故意留的坑，不是 bug。下一课才会解决"数据存在哪、怎么变化"这个问题，这一课只想让你先搞清楚"请求的哪个部分对应哪个装饰器"。

## 动手

```bash
npm run lesson -- 02
curl http://localhost:3000/projects
curl http://localhost:3000/projects/p-99
curl -X POST http://localhost:3000/projects \
  -H 'Content-Type: application/json' \
  -d '{"name":"我的 NestJS 课程"}'
```

预期列表返回一个演示项目；详情会把 URL 中的 `p-99` 原样放入响应；POST 会读取 JSON 中的 `name`。本课尚未持久化，POST 后再次 GET 看不到新项目是刻意限制。

## 与上一课比较

只比较 `src/app.controller.ts`。找出新增的三个路由及每个参数来自哪里。

## 课堂练习

练习增加 `DELETE /projects/:id`，先只返回 `{ deletedId: id }`。

## 常见错误

- 把 `:id` 写成固定字符串 `id`，导致路由无法提取参数。
- 认为 TypeScript 的 `{ name: string }` 会自动验证运行时 JSON；第 06 课才解决这一点。
- 用 GET body 表达查询条件，导致客户端和缓存行为不一致。

## 自测题

- class 上的 `@Controller()` 与方法路径怎样组合？
- path 参数和 body 分别适合表达什么？
- 为什么 GET 通常不使用 body？

## 完成标准

- 三个 curl 都得到与输入对应的响应。
- 你能从 `POST /projects` 反推出类装饰器与方法装饰器。
- 你能解释为什么这还不是 CRUD。
