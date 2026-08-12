# 第 06 课：DTO、ValidationPipe 与参数转换

## 本课目标

- 理解 DTO 同时承担输入契约、运行时校验和 API 文档信息。
- 掌握白名单、禁止额外字段和类型转换的作用。
- 区分“输入格式合法”与“业务行为允许”。

## 心智模型

网络输入永远不可信。DTO 描述允许进入的形状，Pipe 在 Controller 方法运行前执行验证/转换；Service 接收到的是通过边界检查的数据。

```text
JSON / path / query（未知输入）
  → DTO + Pipe（结构、格式、类型）
  → Service（资源存在、归属、权限等业务规则）
```

## 最终项目文件导航

- `src/app.setup.ts`：全局 `ValidationPipe` 配置。
- `src/common/decorators/trim.decorator.ts`：在长度校验前规范化字符串。
- `src/modules/auth/dto/register.dto.ts`、`login.dto.ts`：身份输入。
- `src/modules/projects/dto/create-project.dto.ts`、`update-project.dto.ts`：项目输入。
- `src/modules/tasks/dto/create-task.dto.ts`、`update-task.dto.ts`：任务输入。
- `src/modules/tasks/dto/query-tasks.dto.ts`：查询、分页、筛选输入。
- `src/modules/tasks/tasks.controller.ts`：DTO 被绑定到 HTTP 输入的位置。

## 核心讲解

DTO 必须使用 class。TypeScript interface 编译后不存在，`class-validator` 无法取得运行时元数据。常用边界配置：

- `whitelist: true`：仅保留 DTO 声明字段。
- `forbidNonWhitelisted: true`：发现额外字段就报 400，让调用者及时发现拼写或越权字段。
- `transform: true`：把 query/path 中的字符串按 DTO 元数据转换。

更新 DTO 看似可以直接用 `PartialType` 复用创建 DTO，但 `undefined`、`null` 与空字符串经常具有不同业务含义。本项目显式编写更新 DTO：标题只能省略、不能为 `null`；描述允许传 `null` 来清空。不要让客户端提交 `id`、`ownerId`、`createdAt` 等服务端控制字段。

字符串长度必须在去掉两端空白后验证。本项目的 `@Trim()` 只规范化普通字符串，不会修改密码；否则像 `"   "` 这样的名称可能先通过长度校验，再被 Service 保存成空字符串。

校验装饰器解决字符串长度、枚举、日期格式、邮箱等输入问题；“项目是否存在”“当前用户是否是 owner”要查询上下文，应留在 Service/Guard，避免把 Pipe 变成业务层。

## 动手步骤与练习

1. 查看全局 ValidationPipe 的三个关键选项。
2. 对 CreateTaskDto 每个字段写出合法值、边界值、非法值。
3. 发送一个带未知字段的创建请求，观察 400 错误结构。
4. 向分页 query 传入字符串形式的数字，追踪转换后类型。
5. 分别向 PATCH 发送“省略字段”“字段为 null”“字段为空白”，比较结果。
6. 练习：列出三个绝不能由客户端控制的实体字段，并说明原因。

## 验收清单

- [ ] 无效邮箱、空标题、非法状态会在进入业务逻辑前返回 400。
- [ ] 纯空白标题与 `null` 标题返回 400，而可清空描述接受 `null`。
- [ ] 多余字段不会静默进入实体。
- [ ] 我能解释为何 DTO 使用 class，而不是 interface 或 type-only import。
- [ ] 我能区分格式校验与业务校验。

## 常见误区

- **只写 TypeScript 类型**：类型只在编译期保护开发者，不能约束网络 JSON。
- **误以为 query 天生是 number**：HTTP 查询值起初是字符串。
- **把 Entity 直接当输入 DTO**：会暴露不应由客户端修改的字段。
- **所有字段都加 `@IsOptional()`**：创建与更新契约会失去区别。

## 下一课

输入错误已经能返回 400；下一课统一处理 404、409、500 等异常，让失败也拥有稳定契约。
