# 第 14 课：查询参数、分页排序与 Swagger

## 学习目标

- 为列表接口设计有边界的分页、筛选与排序合同。
- 安全转换 URL 字符串值。
- 理解 OpenAPI 是可发现合同，而不是测试替代品。

## 为什么列表接口要单独学习

这一课解决两个实用问题。一是数据一多，直接把全部结果返回会拖垮服务和客户端，所以列表必须支持翻页；查询参数也是不可信的输入，页码要有下限、limit 要有上限、排序只能从固定的几个字段里选，绝不能把客户端传来的字符串直接拼进 SQL 里。二是给接口配上文档，让别人不用读代码也能知道怎么调用。

## 本课新增的合同

```text
GET /projects/:projectId/tasks
  ?page=1
  &limit=20
  &done=true
  &sortBy=createdAt
  &sortOrder=DESC
```

响应格式是 `{ data, meta }`，`meta` 里带着总共多少条、当前第几页这些信息，方便前端知道该怎么展示。当排序字段的值相同时，额外用 `id ASC` 兜底排序，不然翻页的时候结果顺序可能会莫名其妙跳来跳去。

## DTO 的转换

URL 里的查询参数本质上都是字符串。`@Type(() => Number)` 配合 ValidationPipe 的 `transform`，会先把页码这类值转成数字，再去验证它合不合法。

布尔值要用显式的 `@Transform` 处理，只认字符串 `"true"`/`"false"`，因为 JavaScript 里直接写 `Boolean('false')` 得到的其实还是 `true`——这是个容易踩的坑。

## Swagger

启动后打开：

```bash
npm run lesson -- 14
open http://localhost:3000/docs
```

Swagger 就是这一课说的"接口文档"——由代码里的装饰器和 DTO 信息自动生成，还带个界面能直接在网页上试调接口。它能让你少读很多代码，但不能替代自动化测试，敏感的生产环境也不该无条件把它公开出去。

先注册拿到 token，在 Swagger 页面右上角的 Authorize 里填进去，再去试调受保护的接口。如果页面打得开、接口却返回 401，先检查是不是 token 填错了，而不是急着去改 Guard 的代码。

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

- 非法 page/limit/sortBy 返回 400。
- limit 最大 100。
- 返回包含分页 meta。
- Swagger 能授权并试调受保护接口。

## 官方延伸阅读

- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)
