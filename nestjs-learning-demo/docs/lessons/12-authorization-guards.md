# 第 12 课：授权、Guard 与资源所有权

## 本课目标

- 明确认证与授权的差异。
- 理解全局认证 Guard、公开路由元数据和资源级所有权检查如何配合。
- 防止只猜到 UUID 就访问他人项目或任务。

## 心智模型

认证先建立可信身份，授权再结合“用户 + 动作 + 资源”作决定。

```text
JwtAuthGuard：token 有效吗？是谁？
        ↓
Projects/Tasks Service：这个 userId 拥有目标 project 吗？
        ↓
允许执行，或抛出 403/404
```

只检查“已登录”远远不够；每一次资源读取和修改都要约束到当前用户。

## 最终项目文件导航

- `src/common/guards/jwt-auth.guard.ts`：全局身份验证。
- `src/common/decorators/public.decorator.ts`：公开端点元数据。
- `src/common/decorators/current-user.decorator.ts`：把可信 userId 传给 Controller。
- `src/app.module.ts`：全局 Guard 注册。
- `src/modules/projects/projects.service.ts`：项目 owner 范围查询/校验。
- `src/modules/tasks/tasks.service.ts`：通过 projectId 约束任务操作。
- `src/modules/projects/projects.controller.ts`、`src/modules/tasks/tasks.controller.ts`：传递当前用户身份。

## 核心讲解

Guard 适合在处理程序执行前依据 token 和路由元数据快速决策。资源授权往往需要加载 Project；本项目将 owner 检查放在 ProjectsService/TasksService 的资源查询中，可以同时保证每个用例都不遗漏归属条件。

若未来 OWNER/MEMBER/ADMIN 规则变多，可把策略抽成专门授权 Provider 或资源 Guard。但不要只写一个 `@Roles('owner')` 就认为安全：角色是上下文相关的，必须确认当前用户是“这个项目”的 owner。

列表查询必须按 ownerId 过滤；详情、更新、删除要同时校验资源 ID 和 ownerId；嵌套任务必须同时约束 taskId 与 projectId。先查任意资源再返回“属于别人”可能泄露资源存在性，实际产品可根据威胁模型选择 403 或 404，但全项目要保持一致。

## 动手步骤与练习

1. 注册两个用户 A/B；A 创建项目和任务。
2. 用 B 的 token 尝试列表、详情、更新、删除 A 的资源。
3. 检查每条 Service 查询是否携带当前 userId/projectId 边界。
4. 画一张最小权限矩阵：匿名、owner、其他已登录用户 × 读/写/删。
5. 练习：说明为什么从 body 读取 `ownerId` 是严重漏洞。

## 验收清单

- [ ] 未登录访问受保护接口得到 401。
- [ ] 已登录但不拥有资源时不能读写，得到项目约定的 403/404。
- [ ] 用户看不到其他用户的项目列表。
- [ ] taskId 不能绕过 URL 中的 projectId 边界。
- [ ] ownerId 始终来自已验证身份，而不是客户端 body。

## 常见误区

- **认证通过就允许一切**：这是典型越权漏洞。
- **只保护写接口**：敏感读取同样需要授权。
- **先按 ID 查再忘记校验 owner**：UUID 难猜不等于权限控制。
- **Controller 复制权限判断**：容易漏掉新入口，应让用例层保持不变量。

## 下一课

资源访问已经安全；下一课为任务列表加入分页、筛选和排序，同时保持可预测查询契约。
