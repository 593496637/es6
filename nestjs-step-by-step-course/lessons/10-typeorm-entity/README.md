# 第 10 课：TypeORM、Entity 与 Repository

## 学习目标

- 区分 DTO、Entity 和 Repository。
- 理解数据库接入为何让 Service 变成异步。
- 知道 `synchronize: true` 只适合本课实验。

## 这节课发生的关键变化

上一课的数据只活在数组里，重启即丢失。本课把存取职责交给 Repository，并用 Entity 描述表结构。Controller 的 HTTP 合同基本不变，Service 的实现从数组换成数据库。

## 对照上一课

```text
以前：Controller -> TasksService -> Task[]
现在：Controller -> TasksService -> Repository<Task> -> SQLite
```

## 本课新增

- `Task` Entity：表名、列、主键和时间戳。
- `TypeOrmModule.forRoot`：建立数据库连接。
- `TypeOrmModule.forFeature`：向 TasksModule 提供 Task Repository。
- `@InjectRepository(Task)`：通过依赖注入拿 Repository。

## 运行

```bash
npm run lesson -- 10
curl -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"写入 SQLite"}'
```

注意 ID 已由整数变成 UUID，Service 方法也变成异步。

## 一个刻意保留的临时设置

本课使用 `synchronize: true`，只为了第一次看清 Entity 如何生成表。它会自动改结构，不适合生产。下一课会把它关掉，并正式学习 Migration。

## 课堂练习

把 `DB_PATH` 改为 `lesson10.sqlite`，创建任务后重启，确认数据仍存在；实验后删除该本地文件。

## 常见错误

- 忘记 `forFeature([Task])`，导致 Repository 无法注入。
- 把 Repository 查询忘记 `await`。
- 在生产使用 `synchronize: true`，把自动改表当 Migration。

## 自测题

- `forRoot` 和 `forFeature` 分别注册什么？
- UUID 与递增整数对 API 有何可见变化？
- 为什么 Entity 不应该直接替代请求 DTO？

## 完成标准

- 你能区分 DTO 与 Entity。
- 你能解释 `forRoot` 和 `forFeature` 各负责什么。
- 你知道 Repository 隐藏了具体 SQL，但数据库操作仍是异步边界。

## 官方延伸阅读

- [NestJS Database and TypeORM](https://docs.nestjs.com/techniques/database)
