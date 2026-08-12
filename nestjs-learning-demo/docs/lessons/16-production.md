# 第 16 课：生产准备

## 本课目标

- 认识“能在本机运行”和“适合部署”之间的差距。
- 看懂本项目已有的安全头、CORS、限流、健康检查和优雅关闭。
- 建立构建、迁移、配置、观测与回滚的上线清单。

## 心智模型

生产化不是某个装饰器，而是多层防线与可运行性约束：

```text
客户端
 → CORS / Helmet / 限流
 → 认证授权 / 校验
 → 业务与数据库
 → 日志、requestId、健康信号

部署流程：配置校验 → 迁移 → 启动 → readiness → 接流量
```

## 最终项目文件导航

- `src/main.ts`、`src/app.setup.ts`：Helmet、CORS、全局前缀、校验、shutdown hooks 与监听。
- `src/app.module.ts`：ThrottlerGuard、全局 Guard/Filter/Interceptor 与数据库启动策略。
- `src/modules/health/health.controller.ts`：liveness 与数据库 readiness。
- `src/common/interceptors/logging.interceptor.ts`：请求耗时与 requestId 日志。
- `src/common/middleware/request-id.middleware.ts`：请求关联。
- `src/config/*.ts`：生产环境配置边界。
- `src/database/data-source.ts`、`src/database/migrations/*`：发布前数据库变更。
- `package.json`：build、lint、test、迁移与 production start 命令。

## 核心讲解

Helmet 设置常用安全响应头；CORS 必须用允许来源列表，不应把 `*` 与凭证混用；Throttler 限制滥用，但单进程内限流并不等于分布式防护。部署在已知反向代理后时，应通过 `TRUST_PROXY` 精确配置可信代理，否则按 IP 限流可能把代理后的用户混为一人。Swagger 由 `SWAGGER_ENABLED` 显式开启，生产默认应关闭或在入口层保护。JWT、DTO 校验和资源所有权仍是各自独立防线。

`/api/health/live` 只说明进程事件循环还能回应；`/api/health/ready` 还检查数据库，供平台决定是否把流量导入。优雅关闭让 Nest 收到终止信号后释放资源，不代表可以无限等待，部署平台仍要配置终止宽限期。

本项目用 SQLite 便于学习。若多实例同时写、需要在线扩缩容或高可用，数据库文件会成为限制，应迁移到托管 PostgreSQL 等外部数据库，并重新验证迁移、事务、备份与连接池。

上线必须构建编译产物，注入强密钥和明确 CORS 来源，先备份并运行迁移，再启动新版本并等待 readiness。示例 `.env` 为本地学习显式启用启动迁移，但代码默认关闭；多实例生产部署必须保持 `DB_MIGRATIONS_RUN=false`，改由单独、受控的发布步骤执行。失败时回滚应用版本；数据库回退要确认是否会丢数据，不能机械执行 `migration:revert`。

## 动手步骤与练习

1. 运行 `npm run lint`、`npm run build`、`npm test`、`npm run test:e2e`。
2. 用生产式环境变量启动构建产物，访问 live 与 ready。
3. 暂时令测试数据库不可用，比较 live 与 ready 的结果；完成后恢复配置。
4. 从响应头确认 Helmet 生效，用不在 allowlist 的 Origin 验证 CORS。
5. 写一份自己的发布清单：备份、迁移、启动、readiness、冒烟测试、回滚负责人。

## 验收清单

- [ ] lint、build、unit、E2E 全部通过。
- [ ] `synchronize` 在生产保持 false，迁移有显式执行计划。
- [ ] JWT_SECRET 足够强且不在仓库，CORS 使用明确来源。
- [ ] live 与 ready 的含义不同，数据库故障会让 ready 失败。
- [ ] 日志可通过 requestId 关联，进程启用优雅关闭。
- [ ] 我知道 SQLite 的部署边界，不把教学默认当通用生产方案。

## 常见误区

- **健康接口永远返回 200**：readiness 必须真实反映关键依赖。
- **启用 Helmet 就等于安全**：仍需认证、授权、输入校验、密钥与依赖治理。
- **应用启动时盲目并发跑迁移**：多实例可能竞争，应由受控发布步骤执行。
- **只备份代码不备份数据**：数据库恢复能力必须定期演练。
- **把开发日志原样当生产观测**：真实系统还应考虑结构化日志、指标、追踪与告警。

## 下一课 / 下一步

主线课程到这里结束。建议先从头独立实现一个较小版本，再按需深入事务、缓存、队列、定时任务、WebSocket、GraphQL、CQRS 或微服务；这些能力都建立在本课程的模块边界、DI 与请求生命周期之上。
