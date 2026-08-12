# 第 09 课：配置与启动时校验

## 本课目标

- 把环境差异从业务代码中分离。
- 理解 `.env`、`ConfigModule`、命名空间配置和 Joi 校验各自作用。
- 让缺失密钥等问题在启动时立即暴露。

## 心智模型

环境变量是外部原始输入，和 HTTP 请求一样需要校验。配置层把字符串环境变量转换为应用可消费的、按领域组织的配置。

```text
process.env（字符串/可能缺失）
  → envValidationSchema（启动时验证）
  → registerAs 命名空间（app/auth/database）
  → ConfigService / 强类型配置消费者
```

## 最终项目文件导航

- `src/config/env.validation.ts`：环境变量规则与默认值。
- `src/config/app.config.ts`：端口、环境、CORS、可信代理和 Swagger 开关。
- `src/config/auth.config.ts`：JWT 有效期、密钥、issuer/audience 和 bcrypt 成本。
- `src/config/database.config.ts`：SQLite 文件路径与迁移启动策略。
- `src/app.module.ts`：全局 ConfigModule 注册。
- `src/main.ts`：消费应用配置。
- `src/modules/auth/auth.module.ts`：消费认证配置。
- `.env.example`：可提交的配置模板，不包含真实秘密。

## 核心讲解

环境变量进入 Node 时都是字符串。`PORT="3000"`、`JWT_EXPIRES_IN_SECONDS="3600"` 需要转换；空值、拼写错误和越界值需要在应用启动前拒绝。Joi schema 集中表达这些条件。

`registerAs('auth', ...)` 给配置建立命名空间，避免到处出现 `process.env.JWT_SECRET`。业务代码直接读取 `process.env` 会隐藏依赖、难以测试，也容易在不同位置采用不同默认值。

`.env.example` 回答“需要配置什么”；本地 `.env` 保存开发值但不应提交；生产密钥应由部署平台注入。生产环境会拒绝示例 JWT_SECRET 和低于 10 的 bcrypt rounds；数据库路径也应指向可持久化且权限适当的位置。迁移与 Swagger 都采用默认关闭、显式开启的策略。

## 动手步骤与练习

1. 对照 `.env.example` 与 `env.validation.ts`，确认字段一一对应。
2. 临时移除 JWT_SECRET 后启动，观察是否在监听端口前失败。
3. 把 PORT 改成非法值，阅读 Joi 错误并定位变量。
4. 从 AuthModule 追踪 JWT 配置如何进入 JwtModule。
5. 练习：把“开发默认值”和“必须显式提供的秘密”分成两列，并说明依据。

## 验收清单

- [ ] 配置缺失或非法时应用会快速失败。
- [ ] 业务模块没有散落读取 `process.env`。
- [ ] `.env.example` 可提交，真实 `.env` 不提交。
- [ ] 我能解释命名空间配置比裸字符串键更安全在哪里。

## 常见误区

- **以为 TypeScript 能验证环境变量**：运行时输入仍需运行时校验。
- **给秘密设置公开默认值**：部署遗漏时应用会带着弱密钥启动。
- **把 `.env` 当唯一配置方式**：生产通常由环境或秘密管理服务注入。
- **配置错误后继续启动**：会把明确的启动错误变成随机运行时故障。

## 下一课

配置已经能安全提供数据库路径；下一课用 TypeORM、SQLite Entity 和 Migration 实现可靠持久化。
