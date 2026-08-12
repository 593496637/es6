# 第 14 课：查询参数、分页排序与 Swagger

## 学习目标

- 为列表接口设计有边界的分页、筛选与排序合同。
- 安全转换 URL 字符串值。
- 理解 OpenAPI 是可发现合同，而不是测试替代品。

## 为什么列表接口要单独学习

数据一多，`find()` 全部返回会拖垮服务和客户端。查询参数同样是不可信输入：页码要有下限，limit 要有上限，排序字段只能来自枚举，绝不能把任意字符串直接拼进 SQL。

## 本课新增的合同

```text
GET /projects/:projectId/tasks
  ?page=1
  &limit=20
  &done=true
  &sortBy=createdAt
  &sortOrder=DESC
```

响应是 `{ data, meta }`。`id ASC` 作为相同排序值的稳定次序，避免翻页时结果随机跳动。

## DTO 的转换

URL 查询值本质都是字符串。`@Type(() => Number)` 配合 ValidationPipe 的 `transform` 将页码转为数字后再验证。

布尔值使用显式 `@Transform`，只接受字符串 `true/false`，避免 `Boolean('false')` 仍为 `true` 的 JavaScript 真值陷阱。

## Swagger

启动后打开：

```bash
npm run lesson -- 14
open http://localhost:3000/docs
```

Swagger 是由装饰器和 DTO 元数据生成的可交互合同，不代替自动化测试，也不应该在敏感生产环境无条件公开。

先注册并复制 token，在 Swagger 的 Authorize 中输入 bearer token，再试调受保护接口。若页面能打开但接口返回 401，先检查授权值，而不是改 Guard。

## 课堂练习

增加 `title` 模糊搜索。先在 DTO 限制长度，再用 TypeORM 的参数化查询实现；不要手工拼接 SQL。

## 常见错误

- 将任意 `sortBy` 直接拼入 SQL，造成注入或未知字段错误。
- 不限制 limit，让客户端一次读取全部数据。
- 用 `Boolean('false')` 转换查询参数，意外得到 true。
- 以为 Swagger 页面可用就证明接口逻辑正确。

## 自测题

- 为什么相同 createdAt 还需要 `id` 稳定排序？
- offset 分页在大数据量下有什么局限？
- DTO 默认值在转换和验证的哪个阶段出现？

## 完成标准

## 官方延伸阅读

- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

- 非法 page/limit/sortBy 返回 400。
- limit 最大 100。
- 返回包含分页 meta。
- Swagger 能授权并试调受保护接口。
