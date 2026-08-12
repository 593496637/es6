# 第 13 课：查询、筛选、排序与分页

## 本课目标

- 为列表接口设计稳定、可组合的 query 契约。
- 理解分页元数据与数据库 `skip/take` 的对应关系。
- 避免开放任意排序字段和不稳定分页。

## 心智模型

列表请求先把字符串 query 转成经过白名单校验的 QueryTasksDto，再由 Service 构造受控的 TypeORM 查询。

```text
?page=2&limit=10&status=todo&priority=high&sortBy=dueDate&order=ASC
   → QueryTasksDto
   → where + order + skip/take
   → { data, meta }
```

## 最终项目文件导航

- `src/modules/tasks/dto/query-tasks.dto.ts`：页码、页大小、筛选与排序白名单。
- `src/modules/tasks/tasks.controller.ts`：`@Query()` 绑定位置。
- `src/modules/tasks/tasks.service.ts`：`where`、稳定 `order`、`findAndCount` 和分页元数据。
- `src/modules/tasks/entities/task.entity.ts`：可筛选字段与组合索引。
- `src/modules/projects/projects.service.ts`：查询前的 owner 边界检查。

## 核心讲解

本接口支持：

- `page`：从 1 开始。
- `limit`：1—100，防止一次读取无限数据。
- `status`：`todo | in_progress | done`。
- `priority`：`low | medium | high`。
- `sortBy`：只允许 `createdAt | dueDate | title`。
- `order`：`ASC | DESC`，输入会规范为大写。

偏移量是 `(page - 1) * limit`。`findAndCount` 同时得到本页 data 和总数，响应中的 `totalPages = ceil(total / limit)`。空结果时 totalPages 为 0，这是有效结果，不是 404。

排序必须有稳定的次级键。本项目在用户选择字段后再按 `id ASC`，避免多个任务排序值相同导致跨页顺序随机。排序字段必须枚举白名单，不能把任意 query 字符串直接变成 SQL 字段。

偏移分页简单直观，但数据量大或频繁插入时会变慢/漂移；届时可演进为游标分页。先把当前契约测清楚，再换实现。

## 动手步骤与练习

1. 创建至少 5 个不同 status/priority/dueDate 的任务。
2. 请求 `page=1&limit=2` 和第 2 页，检查 data 与 meta。
3. 组合 `status=todo&priority=high`，确认两个条件同时生效。
4. 分别按 dueDate ASC 和 createdAt DESC 排序，观察相同值时 ID 次序。
5. 发送 `limit=101`、`page=0`、`sortBy=passwordHash`，确认均为 400。

## 验收清单

- [ ] page/limit 被转换为 number 并有上下界。
- [ ] 筛选可以组合，且始终限制在当前项目。
- [ ] 排序字段来自枚举白名单，并有稳定次级排序。
- [ ] 响应包含 page、limit、total、totalPages。
- [ ] 空列表返回 200 与空 data，而不是 404。

## 常见误区

- **把 query 直接传给 ORM**：可能开放未知字段、巨大 limit 或注入风险。
- **只返回 data 不返回 total**：客户端无法计算分页状态。
- **排序没有次级键**：相同值会导致翻页重复或遗漏。
- **先查任务再做 owner 过滤**：授权边界必须先建立且贯穿查询。

## 下一课

查询契约已经完整；下一课让 Swagger 从 DTO 和 Controller 元数据生成可探索、可直接调用的 OpenAPI 文档。
