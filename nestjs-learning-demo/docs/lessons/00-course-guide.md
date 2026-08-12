# 第 00 课：怎样使用这套课程

## 本课目标

- 知道最终会做出什么，而不是把 NestJS 学成一组零散装饰器。
- 建立 `请求 → Controller → Service → Repository → 数据库` 的主线。
- 学会阅读本仓库的最终代码，并把每课练习当作一次有目的的拆解。

## 心智模型

TaskFlow 是一个任务管理 API。一次“创建任务”不是某个文件独自完成的：路由负责接住请求，DTO/Pipe 拦住坏数据，Guard 判断身份与权限，Service 执行业务规则，Repository 保存实体，Filter 把异常整理成稳定响应。

```text
HTTP 请求
  → 跨领域公共能力（日志、认证、校验）
  → 业务模块入口（Controller）
  → 业务用例（Service）
  → 持久化边界（TypeORM Repository）
  → SQLite
```

Module 则像装配清单：它声明本领域有哪些 Controller 和 Provider，以及哪些能力可被别的模块使用。

## 最终项目文件导航

- `src/main.ts`、`src/app.setup.ts`：应用启动和全局 HTTP 能力。
- `src/app.module.ts`：根模块，连接配置、数据库与业务模块。
- `src/modules/auth`、`src/modules/users`：身份相关能力。
- `src/modules/projects`、`src/modules/tasks`：主要业务能力。
- `src/common`：跨模块的 Guard、Filter、Interceptor、Middleware、Decorator。
- `src/config`：环境配置及启动校验。
- `src/database`：TypeORM DataSource 与迁移。
- `src/modules/health`：运行状态检查。

## 核心讲解：课程怎么学

本仓库保存的是课程结束时的完整应用，不要求为每课准备一份代码快照。学习时按以下循环进行：

1. 先只读本课“心智模型”，用自己的话复述职责。
2. 按“文件导航”追踪一次调用，不急着理解所有装饰器。
3. 启动最终应用，用 `docs/requests/api.http` 观察真实输入和输出。
4. 完成本课练习；练习可写在自己的实验分支或笔记中。
5. 用验收清单检查“是否能解释”，而不只是“请求是否成功”。

推荐先完成 01—08 课再碰数据库。09—14 课把配置、持久化、安全和 API 文档串起来；15—16 课回答“如何证明它可靠、如何安全运行”。

## 动手步骤与练习

1. 在纸上画出注册、登录、创建项目、创建任务四个动作。
2. 对每个动作标出：谁接 HTTP、谁做规则、谁读写数据。
3. 从 `src/app.module.ts` 出发，找到 ProjectsModule 和 TasksModule。
4. 打开 `docs/requests/api.http`，只阅读请求顺序，暂时不要发送。
5. 练习：解释为什么密码校验不应写进 TasksController。

## 验收清单

- [ ] 我能说出 Controller、Service、Module 各自的职责。
- [ ] 我能解释“认证”和“授权”不是同一件事。
- [ ] 我知道最终代码比前几课的中间形态更完整，不会寻找不存在的课程快照。
- [ ] 我能画出一条从 HTTP 到数据库再返回的主链路。

## 常见误区

- **从文件数量判断难度**：先跟一条请求，暂时忽略未经过的文件。
- **背装饰器而不理解职责**：先问“这层解决什么问题”，再记语法。
- **一开始就研究微服务**：先把单体 REST API 的模块边界、DI 和生命周期学扎实。
- **只看不验证**：每课都至少发送一个请求或运行一个测试。

## 下一课

下一课从应用入口开始，弄清 Nest 应用是怎样创建、装配并监听 HTTP 请求的。
