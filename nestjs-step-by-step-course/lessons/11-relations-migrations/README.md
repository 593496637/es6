# 第 11 课：实体关系与 Migration

## 学习目标

- 能从业务归属设计一对多关系和外键。
- 区分当前 Entity 模型与数据库演进历史。
- 理解嵌套路由与联合查询怎样共同保证资源归属。

本课增量比前几课大。建议分成两个 30 分钟小节：先只看 Project/Task 关系并跑接口；休息后再读 Migration。不要一次读完所有文件。

## 这节课只做两件事

真实业务里，数据不是一张孤零零的表——一个项目下面有很多任务，这就是"一对多"的关系。这一课要做两件事：

1. 让项目能拥有多个任务：`Project 1 -> N Task`。
2. 关掉上一课那个自动改表的开关，改成用 Migration 正式管理表结构变化。

## 先理解关系

Task 表里存了一个 `projectId` 字段指向它属于哪个项目，这就是外键。代码里写的 `ManyToOne`/`OneToMany` 只是方便你在代码里"从一个对象导航到另一个对象"，真正保证数据不会乱的，是数据库层面的外键约束。

接口的路径也在表达这种归属关系：

```text
POST /projects
GET  /projects
POST /projects/:projectId/tasks
GET  /projects/:projectId/tasks
```

查询单个任务的时候，要同时用 `{ id, projectId }` 两个条件一起查，这样即使有人拿着别的项目下的任务 ID，从错误的项目路径去访问，也查不到。

## 为什么需要 Migration

Entity 描述的是"现在这张表应该长什么样"，Migration 描述的是"数据库是怎么一步步从旧的样子变成现在这个样子的"。后者的好处是可以被审查、按顺序执行、也能按顺序撤销——线上要是同时跑着好几个实例，不能让大家各自猜测、各自去改表结构，那样会互相打架。

这一课为了方便你在单进程下练习，让程序启动时自动执行 Migration。到第 17 课部署那一课，会把这个自动执行的逻辑从多实例的启动流程里挪出去。

## 运行

```bash
npm run lesson -- 11
```

先创建项目，复制返回的 UUID，再执行：

```bash
curl -X POST http://localhost:3000/projects/项目UUID/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"属于项目的任务"}'
```

## 推荐阅读顺序

1. `projects/project.entity.ts`
2. `tasks/task.entity.ts`
3. `database/1730000000000-initial-schema.ts`
4. 两个 Module 和 Service

## 课堂练习

给 Project 增加可空的 `description`：先改 Entity，再写一条新的 Migration，不要修改已经存在的初始 Migration。

## 常见错误

- 只声明 `OneToMany`，却不知道真正的外键列在 Task 表。
- 查询任务只用任务 ID，不校验 URL 中的 projectId。
- 为了匹配新 Entity 修改已经发布的旧 Migration，破坏迁移历史。
- 在 Migration 中尝试注入 Nest Service；Migration 由 TypeORM CLI 管理，不在 Nest DI 生命周期中。

## 自测题

- 为什么外键放在 Task 而不是 Project？
- `{ id, projectId }` 联合条件防止什么问题？
- 新增列时为什么应新建 Migration？

## 完成标准

- 你能指出外键存在哪张表。
- 删除 Project 时任务会级联删除。
- 你能解释 Entity 和 Migration 不是同一个东西。

## 官方延伸阅读

- [NestJS TypeORM integration](https://docs.nestjs.com/techniques/database)
