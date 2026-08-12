# 第 14 课：Swagger 与 OpenAPI

## 本课目标

- 理解 OpenAPI 描述与 Swagger UI 的关系。
- 看懂 DTO、Controller 装饰器如何形成接口文档。
- 能在浏览器中完成带 Bearer token 的主要流程。

## 心智模型

运行时代码决定接口真实行为，OpenAPI 是机器可读的契约描述，Swagger UI 则把这份描述变成交互页面。

```text
Controller 路由元数据 + DTO schema 元数据
  → SwaggerModule.createDocument()
  → OpenAPI document
  → /api/docs 交互界面
```

文档不是实现；它必须随代码和测试一起维护。

## 最终项目文件导航

- `src/app.setup.ts`：DocumentBuilder、Bearer auth 与 `/api/docs` 挂载。
- `src/modules/auth/auth.controller.ts`：tag、operation 和响应说明。
- `src/modules/projects/projects.controller.ts`：受保护资源的 Bearer 标记。
- `src/modules/tasks/tasks.controller.ts`：嵌套路由和查询 API。
- `src/modules/auth/dto/*.dto.ts`：认证输入 schema。
- `src/modules/projects/dto/*.dto.ts`：项目创建与更新 schema。
- `src/modules/tasks/dto/*.dto.ts`：任务字段、枚举和分页 query schema。

## 核心讲解

`DocumentBuilder` 设置标题、版本和 Bearer security scheme。`SwaggerModule.createDocument()` 从运行时元数据生成文档，`setup('api/docs', ...)` 提供 UI。示例 `.env` 用 `SWAGGER_ENABLED=true` 显式开启；生产环境可以关闭或在入口层保护。

`@ApiTags()` 组织端点，`@ApiOperation()` 解释意图，`@ApiProperty()` / `@ApiPropertyOptional()` 补充字段示例、枚举与 nullable 语义，`@ApiBearerAuth()` 告诉文档该端点需要授权。本项目显式编写 update DTO，让“省略”“传 null 清空”和“非法 null”在文档与验证中保持一致。

生成页面只是起点。真实状态码、错误体、分页响应与授权要求若没有被描述，调用者仍会困惑。每次改变 DTO 或路由后，应同时查看 Swagger、发送真实请求并运行测试。

生产环境是否公开 Swagger 是部署决策；可关闭、加认证或只在内网开放。不要在示例值或说明中放真实 token 和密钥。

## 动手步骤与练习

1. 启动应用并打开 `http://localhost:3000/api/docs`。
2. 在 UI 中注册或登录，复制 accessToken 到 Authorize 的 Bearer 输入。
3. 完成创建项目、创建任务、查询任务。
4. 对照 CreateTaskDto，检查字段必填、枚举与示例是否正确。
5. 练习：找一个文档不足的响应，为它设计更精确的 `@Api...Response` 描述。

## 验收清单

- [ ] `/api/docs` 可打开并列出 auth/projects/tasks。
- [ ] Authorize 后可调用受保护接口。
- [ ] DTO 的必填/可选、枚举和示例与真实校验一致。
- [ ] 我能解释 OpenAPI、Swagger UI 与实际 Controller 的关系。
- [ ] 文档中没有真实秘密。

## 常见误区

- **Swagger 页面能请求就认为文档准确**：仍需检查状态码和 schema。
- **只装包不注册 SwaggerModule**：不会自动出现文档。
- **把所有更新 DTO 都机械地写成 PartialType**：可能掩盖字段能否传 `null` 的不同语义。
- **把 Swagger 当测试替代品**：交互检查不能稳定覆盖回归。

## 下一课

文档告诉调用者“应该怎样工作”；下一课用单元测试和 E2E 测试证明关键行为真的如此。
