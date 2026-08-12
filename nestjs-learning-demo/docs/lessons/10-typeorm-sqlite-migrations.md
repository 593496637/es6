# 第 10 课：TypeORM、SQLite 与 Migration

## 本课目标

- 理解 Entity、Repository、DataSource 和 Migration 的分工。
- 看懂 User、Project、Task 的关系及外键行为。
- 使用显式迁移管理数据库结构，而不是依赖自动同步。

## 心智模型

Entity 是对象与表的映射，Repository 是常用数据操作入口，DataSource 是 TypeORM 的数据库连接与元数据中心，Migration 是可审查、可前进、可回退的结构变更历史。

```text
Service → Repository<Entity> → DataSource → SQLite 文件
                                      ↑
                               Migration 定义结构
```

## 最终项目文件导航

- `src/modules/users/entities/user.entity.ts`：用户表与唯一邮箱。
- `src/modules/projects/entities/project.entity.ts`：项目及 owner 关系。
- `src/modules/tasks/entities/task.entity.ts`：任务、枚举字段与 project 关系。
- `src/database/data-source.ts`：CLI 使用的独立 DataSource。
- `src/database/migrations/1720000000000-initial-schema.ts`：首个结构迁移。
- `src/config/database.config.ts`：数据库路径来源。
- `src/app.module.ts`：Nest 运行时 TypeORM 配置。
- `src/modules/tasks/tasks.module.ts`：`forFeature` 注册 Repository。

## 核心讲解

本课程使用 `better-sqlite3`，让学习者无需先安装数据库服务。它适合单机学习和测试；生产规模、并发写入和高可用需求出现时，应评估 PostgreSQL 等服务型数据库。

关系主线是：User 一对多 Project，Project 一对多 Task。Project 保存 `ownerId`，Task 保存 `projectId`。外键阻止孤儿数据；本项目的级联删除意味着删除用户会删除其项目，删除项目会删除其任务，因此删除接口必须有明确授权。

`synchronize: false` 很重要。自动同步会根据当前 Entity 直接改表，难以审查，也不能可靠表达数据迁移。Migration 的 `up` 创建/升级结构，`down` 描述回退；上线前要备份并在相同数据库类型上演练。

Nest 运行时与 TypeORM CLI 都需要配置。两者应指向同一批 Entity/Migration 和正确数据库路径，否则会出现“应用能查表，但 CLI 找不到迁移”之类分裂。

为了让本地课程第一次启动即可使用，示例 `.env` 显式设置 `DB_MIGRATIONS_RUN=true`，运行时会应用尚未执行的迁移。代码默认值是 `false`；多实例生产部署应保持关闭，并在受控、单次的发布步骤执行迁移，再启动应用实例。

## 动手步骤与练习

1. 画出 users、projects、tasks 的主键、外键和基数关系。
2. 对照 Entity 与初始 Migration，逐字段检查类型、可空性、默认值、索引。
3. 执行项目提供的 migration show/run 脚本，再启动应用创建数据。
4. 重启应用并重新查询，验证数据仍在。
5. 在无重要数据的练习库执行 revert，再 run，理解上下迁移；不要对有价值数据盲目回退。

## 验收清单

- [ ] 我能解释 Entity、Repository、DataSource、Migration。
- [ ] 重启 API 后数据仍存在。
- [ ] `synchronize` 保持关闭，结构由迁移创建。
- [ ] 我能说明删除 Project 对 Task 的影响。
- [ ] 我知道 SQLite 文件不应作为源码提交。

## 常见误区

- **修改 Entity 就以为数据库已改变**：关闭 synchronize 后必须编写并运行迁移。
- **只写 up 不考虑 down**：回滚与故障恢复会失去路径。
- **生产直接执行未演练迁移**：结构锁、耗时和数据兼容都需评估。
- **在 Service 手写 SQL 到处查询**：优先通过 Repository/QueryBuilder 保持边界。

## 下一课

数据已经能持久化；下一课实现注册、密码哈希、登录与 JWT，让请求拥有可验证身份。
