# 第 05 课：内存 CRUD 与 Repository 边界

## 本课目标

- 用最少基础设施理解 CRUD 的完整业务闭环。
- 区分“业务用例”和“数据保存方式”。
- 理解 Repository 边界为何能让内存实现平滑演进为数据库实现。

## 心智模型

学习中的第一版可以用数组保存任务：它启动快、逻辑直观，但进程重启后数据消失。关键不是长期使用数组，而是在进入数据库之前先识别持久化边界。

```text
Controller → TasksService → Repository 契约
                              ├─ 内存实现（课程中间形态）
                              └─ TypeORM Repository（最终项目）
```

最终仓库已经采用 SQLite + TypeORM，不包含每课代码快照。阅读时可以把 TypeORM 的 `Repository<Task>` 暂时想象成一个提供 `find/save/delete` 的可替换数据端口。

## 最终项目文件导航

- `src/modules/tasks/tasks.service.ts`：CRUD 用例与归属规则。
- `src/modules/tasks/tasks.controller.ts`：把 HTTP 输入交给用例。
- `src/modules/tasks/entities/task.entity.ts`：最终持久化模型。
- `src/modules/tasks/tasks.module.ts`：注册 TypeORM Repository。
- `src/modules/projects/projects.service.ts`：项目 CRUD 与所有权规则。
- `src/modules/projects/entities/project.entity.ts`：项目持久化模型。

## 核心讲解

一个完整 CRUD 至少要回答：ID 如何生成、找不到资源怎么办、更新哪些字段、删除不存在资源是否报错、任务是否真的属于 URL 中的项目。

内存版可从 `Map<string, Task>` 开始。Service 依赖一个最小接口，例如 `findById`、`findMany`、`save`、`remove`，而不是依赖数组细节。切换到 TypeORM 时，Controller 的路由和大部分业务规则不需要改变。

Repository 不是把业务规则藏起来的地方。它负责查询与保存；“只有项目所有者能修改”“完成任务必须存在”仍属于应用/领域规则，应由 Service 或专门授权组件表达。

最终代码直接使用 TypeORM Repository，也同样形成持久化边界。只有当替换存储、组合复杂查询或测试成本需要时，才值得再封装自定义 Repository；不要为了抽象而抽象。

## 动手步骤与练习

1. 不接数据库，用纸面或实验文件设计 `TaskRecord` 和内存 Map。
2. 写出创建、列表、详情、部分更新、删除五个 Repository 操作的输入输出。
3. 从最终 TasksService 标出哪些行是业务规则，哪些行是 TypeORM 调用。
4. 练习：设计一个 Repository token 和两个实现的构造关系，无需改最终源码。
5. 练习：解释为什么只用 taskId 查询后直接更新可能产生跨项目访问漏洞。

## 验收清单

- [ ] 我能描述一次完整 CRUD 的成功与失败分支。
- [ ] 我知道内存数据重启即丢失，适合教学而非最终持久化。
- [ ] 我能区分 Service 规则与 Repository 数据操作。
- [ ] 我理解最终项目使用数据库并不否定本课的边界思想。

## 常见误区

- **数组就是 Repository 架构**：数组只是实现，边界来自依赖方向与稳定契约。
- **Repository 承担权限规则**：会让业务含义埋在查询细节里。
- **先写数据库再想用例**：容易把课程变成 ORM API 学习。
- **用 `synchronize` 代替迁移**：最终项目应由显式迁移管理结构。

## 下一课

CRUD 能处理正常输入；下一课在系统边界使用 DTO 与 Pipe，阻止无效或多余数据进入业务层。
