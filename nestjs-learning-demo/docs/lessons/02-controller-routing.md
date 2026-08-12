# 第 02 课：Controller 与路由

## 本课目标

- 理解 Controller 是 HTTP 适配层，而不是业务逻辑仓库。
- 掌握路径参数、查询参数、请求体和常用 HTTP 方法。
- 能为 TaskFlow 的资源设计一致的 REST 路由。

## 心智模型

Controller 做“协议翻译”：把 HTTP 中的 method、path、query、body 翻译成一次 Service 调用，再把结果交给 Nest 序列化为响应。

```text
POST /api/projects/:projectId/tasks
  path: projectId + body: task fields
  → TasksController.create(projectId, dto)
  → TasksService.create(...)
```

## 最终项目文件导航

- `src/modules/projects/projects.controller.ts`：项目资源路由。
- `src/modules/tasks/tasks.controller.ts`：嵌套在项目下的任务路由。
- `src/modules/auth/auth.controller.ts`：注册、登录、当前用户入口。
- `src/modules/health/health.controller.ts`：无业务参数的简单路由。

## 核心讲解

Controller 类上的路径是共同前缀，方法装饰器再追加具体路径。任务属于项目，因此任务地址携带 `projectId`：

- `GET /projects/:projectId/tasks`：列表。
- `POST /projects/:projectId/tasks`：创建。
- `GET /projects/:projectId/tasks/:taskId`：详情。
- `PATCH /projects/:projectId/tasks/:taskId`：部分更新。
- `DELETE /projects/:projectId/tasks/:taskId`：删除。

`@Param()` 读取路径，`@Query()` 读取筛选与分页，`@Body()` 读取 JSON。它们只是输入来源；可信度由后续 DTO/Pipe 决定。Controller 应保持薄：不直接操作数据库、不散落权限判断、不手工拼每种错误响应。

状态码表达结果语义：查询成功通常为 200，创建通常为 201，删除可返回 204；不存在是 404，未登录是 401，无权限是 403。不要用“HTTP 200 + 自定义错误码”掩盖 HTTP 语义。

## 动手步骤与练习

1. 在 ProjectsController 中逐个标出 class path、method path 和最终 URL。
2. 对 TasksController 的每个参数标注来自 path、query 还是 body。
3. 用 `docs/requests/api.http` 观察创建、列表、详情、更新、删除的 method 是否一致。
4. 练习设计“把任务标记为完成”的两种方案：专用动作路由与 PATCH 状态字段，比较各自语义。
5. 练习：解释为什么 `GET` 不应依赖请求体。

## 验收清单

- [ ] 我能从装饰器推导最终 URL。
- [ ] 我能区分 path、query 和 body 的用途。
- [ ] 我能解释 POST、GET、PATCH、DELETE 在本项目中的含义。
- [ ] Controller 中没有直接读写 TypeORM Repository 的必要。

## 常见误区

- **路由声明顺序造成歧义**：静态路径与 `:id` 路径要避免冲突。
- **把筛选条件放进 path**：可选、可组合条件通常更适合 query。
- **在 Controller 写业务规则**：规则应能脱离 HTTP 被测试和复用。
- **忘记嵌套资源归属**：查询 taskId 时仍要确认它属于 URL 中的 projectId。

## 下一课

Controller 已经能翻译请求；下一课把真正的业务工作交给 Provider，并理解 Nest 如何注入依赖。
