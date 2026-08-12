# 第 13 课：Guard、当前用户与数据所有权

## 学习目标

- 用全局 Guard 建立默认拒绝策略。
- 理解验证 JWT 后仍需加载当前用户。
- 把资源所有权落实到数据库查询条件。

建议先只学习 Guard 与 `@Public()`，确认 401/公开路由后，再学习 ownerId 和嵌套任务作用域。

## 本课从“能登录”走到“只能看自己的数据”

全局 Guard 默认保护所有路由，只有明确标记 `@Public()` 的注册和登录可以匿名访问。这种 default-deny 思路比逐个路由记得加 Guard 更安全。

## 请求链路

```text
Authorization: Bearer JWT
       -> JwtAuthGuard 验签
       -> 用 sub 查询数据库中的最新用户
       -> request.user
       -> @CurrentUser() 注入 Controller
       -> Service 查询 { id, ownerId }
```

Guard 不直接信任 JWT 中易变化的邮箱或昵称，而且会确认用户仍然存在。

## 所有权不是 Controller 的 if

项目查询直接带 `ownerId`：`findOneBy({ id, ownerId })`。任务访问先确认父项目属于当前用户，再按 `{ id, projectId }` 查询。找不到和越权都返回 404，减少资源枚举信息。

## 所有权字段如何迁移

本课没有篡改第 12 课已经存在的初始 Migration，而是新增 `1740000000000-add-project-owner.ts`。示例先把 `ownerId` 设为 nullable，是因为真实系统升级时可能已经有旧项目，没有可直接填写的 owner。

生产迁移通常分阶段：先加可空列与索引，回填旧数据，部署新代码，最后再用下一条 Migration 收紧为 NOT NULL 并添加外键。本课程没有旧数据，因此代码创建的新项目始终写入 ownerId；保留 nullable 是为了教会安全演进，而不是最终业务允许无主项目。

## 运行

1. 启动：`npm run lesson -- 13`
2. 注册，复制 `accessToken`。
3. 不带 token 请求 `GET /projects`，应得 401。
4. 带 `Authorization: Bearer TOKEN` 创建和读取项目。
5. 再注册第二个账号，用它访问第一个账号的项目，应得 404。

## 重点文件

- `auth/jwt-auth.guard.ts`
- `auth/public.decorator.ts`
- `auth/current-user.decorator.ts`
- `projects/projects.service.ts`
- `tasks/tasks.service.ts`

## 课堂练习

为 Project 增加删除接口。删除前必须用 `{ id, ownerId }` 找到实体；用两个账号证明越权用户删不掉它。

## 常见错误

- 给少数路由手工加 Guard，新增路由时忘记保护。
- 验签后永久信任 JWT 内旧邮箱或昵称，不确认用户是否仍存在。
- 先按 ID 查出资源，再在 Controller 做 owner if，容易在其他调用入口漏检。
- 越权返回 403、资源不存在返回 404，从而泄露资源是否存在；本课程统一为 404。

## 自测题

- Authentication 与 Authorization 分别在哪一步发生？
- `@Public()` 为什么要用 Reflector 读取元数据？
- 所有权条件为什么应进入 Repository 查询？
- 为什么不能直接修改上一课的初始 Migration？

## 完成标准

## 官方延伸阅读

- [NestJS Authorization](https://docs.nestjs.com/security/authorization)

- 匿名请求默认 401。
- 注册和登录仍公开。
- `/auth/me` 返回数据库中的最新公开用户。
- 用户只能读写自己项目下的数据。
