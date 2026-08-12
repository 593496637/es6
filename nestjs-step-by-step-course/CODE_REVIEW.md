# Code Review 与教学审查记录

本文件记录本轮审查中发现并已经处理的问题，也说明仍然存在的教学取舍。它不是“代码永远最佳”的证明；课程升级依赖后应重新运行同样的检查。

## 已修复的问题

### P1：第 17 课不是渐进演进

原第 17 课直接复制完整成品，和第 16 课有 70 多个文件差异，学生无法建立因果关系。现在第 17 课直接承接第 16 课，只增加生产边界；完整企业版仍单独保存在 `../nestjs-learning-demo`。

### P1：Migration 历史被改写

第 13 课最初直接修改了第 12 课的初始 Migration 来增加 `ownerId`。现在保留初始 Migration 不变，新增 `1740000000000-add-project-owner.ts`，并解释 nullable -> 回填 -> 收紧约束的分阶段迁移思路。

### P1：E2E 存在顺序依赖

第 16 课原测试共享 suite 级内存库和 token/projectId。现在每个 `it` 都在 `beforeEach` 创建独立应用与 `:memory:` 数据库，并在 `afterEach` 关闭。

### P1：健康失败响应可能被通用 Filter 改坏

第 17 课 Filter 现在识别 Terminus 503 健康协议并原样保留，普通异常继续使用课程错误信封。

### P2：真实启动与 E2E 配置漂移

第 16、17 课增加共享 `configureApp()`。第 17 课明确把 request ID 放在 JSON parser 之前，并用 E2E 锁定畸形 JSON 仍可追踪。

### P2：配置使用不一致

数据库和 JWT 改为 `forRootAsync/registerAsync`，通过 ConfigService 消费已经校验的配置；`.env.example` 删除未被代码使用的键。最终课 Swagger、CORS、migration 和 trust proxy 都有真实配置入口。

### P2：Swagger 合同不完整

第 14 课以后的请求 DTO 加入 ApiProperty 元数据，页面能展示 body/query 字段、示例、枚举和边界，而不是只有空对象。

### P2：课程讲义深度和结构不一致

17 课全部拥有学习目标、课堂练习、自测题和完成标准；补充常见错误、预期行为、官方延伸阅读与术语表。结构检查会阻止这些章节以后被误删。

### P3：差异工具不够友好

`lesson:diff` 默认只显示源码，避免讲义文字淹没重点；`lesson:diff:all` 用于第 15～17 课查看测试和配置变化。

## 有意保留的教学取舍

- 第 01～08 课直接读取 PORT，是为了在第 09 课前不提前引入 ConfigModule。
- 第 10 课故意使用 `synchronize: true` 展示 Entity 建表，并在第 11 课立即改为 Migration。
- 第 11～16 课本地单进程自动跑 Migration；第 17 课才将其变成可关闭的部署配置。
- SQLite 适合零外部依赖学习，但不是对所有生产场景的数据库推荐。
- 第 11～13 课知识密度仍高，讲义已拆成建议的两轮阅读；如果学习中仍吃力，应在教师对话中暂停并追加一课练习，不要硬跳。

## 本轮验证证据

- 17 个 lesson 均实际启动并能响应 HTTP。
- TypeScript strict 类型检查通过。
- 课程结构检查通过。
- Prettier 格式检查通过。
- 第 15 课：4 个单元测试通过。
- 第 16 课：7 个测试通过，包含独立数据库 E2E。
- 第 17 课：9 个测试通过，包含健康探针与畸形 JSON 追踪。
- 第 17 课两条 Migration 执行后，TypeORM schema log 为 0 条待变更。
- `npm install` 报告 0 vulnerabilities；后续单独 `npm audit --omit=dev` 被 npm quick-audit 端点以 `Invalid package tree` 拒绝，因此不能把该次单独审计描述为成功。

## 建议的继续学习方式

不要连续阅读 17 个 README。从第 01 课开始，完成实验和自测后再进入下一课。每学完 4～5 课，尝试在空目录不看答案复写一次；卡住的位置才是真正需要复习的知识点。
