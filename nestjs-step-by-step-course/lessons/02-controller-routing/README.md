# 第 02 课：Controller 与路由

## 学习目标

- 理解 HTTP method 与 path 怎样定位 Controller 方法。
- 区分路径参数和 JSON body。
- 能根据需求选择 GET、POST 或 DELETE。

## 上一课留下的问题

第 01 课只有 `GET /`。真实 API 需要列表、详情和创建，并从 URL 或 JSON 中读取输入。

## 本课只增加什么

- `@Get('projects')`：HTTP method + path。
- `@Param('id')`：路径参数。
- `@Body()`：JSON 请求体。
- `@Post()`：创建资源。

```text
POST /projects + { name }
  → AppController.create(body)
  → 返回创建结果
```

当前数据仍是写死的。不要急着解决所有问题；第 03 课才分离业务逻辑。

## 动手

```bash
npm run lesson -- 02
curl http://localhost:3000/projects
curl http://localhost:3000/projects/p-99
curl -X POST http://localhost:3000/projects \
  -H 'Content-Type: application/json' \
  -d '{"name":"我的 NestJS 课程"}'
```

预期列表返回两个演示项目；详情会把 URL 中的 `p-99` 原样放入响应；POST 会读取 JSON 中的 `name`。本课尚未持久化，POST 后再次 GET 看不到新项目是刻意限制。

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
