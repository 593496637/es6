# TaskFlow：NestJS 渐进式学习 Demo

这不是一堆互不相关的小例子，而是一套围绕同一个任务管理 REST API 逐步深入的中文课程。最终项目已经完整可运行，你按课程顺序每次只阅读少量文件，并通过练习把知识串起来。

## 你最终会学到什么

- Nest 启动过程、Controller、Provider、依赖注入与 Module
- REST CRUD、DTO、Pipe、校验、异常与请求生命周期
- 环境配置、TypeORM、SQLite、Entity、Repository 与 Migration
- 注册登录、密码哈希、JWT、全局 Guard 与资源所有权
- 分页筛选、Swagger、单元测试、E2E 测试与生产安全基础

最终 API 支持：注册、登录、查看当前用户、项目 CRUD、任务 CRUD、分页筛选、所有权隔离、统一错误、健康检查与 Swagger 文档。

## 开始学习

建议使用 Node.js 24 LTS；项目支持 Node.js 20.19+、22.13+ 或 24.11+。

```bash
cd /Users/likaikai/project/es6/nestjs-learning-demo
cp .env.example .env
npm install
npm run start:dev
```

打开：

- API 入口：<http://localhost:3000/api>
- Swagger（`.env` 中 `SWAGGER_ENABLED=true` 时）：<http://localhost:3000/api/docs>
- 健康检查：<http://localhost:3000/api/health/ready>

然后从 [COURSE.md](./COURSE.md) 的第 00 课开始。你也可以使用 VS Code REST Client 运行 [docs/requests/api.http](./docs/requests/api.http) 中的完整请求流程。

## 常用命令

```bash
npm run start:dev          # 监听文件并启动开发服务器
npm run build              # 编译 TypeScript
npm run lint               # 静态检查
npm test                   # 单元测试
npm run test:e2e           # 真实 HTTP 端到端测试
npm run db:migration:show  # 查看迁移状态
npm run db:migration:run   # 手动执行迁移
npm run db:migration:revert # 回滚最近一次迁移
```

数据库文件默认位于 `data/taskflow.sqlite`。首次本地学习可在 `.env` 中显式设置 `DB_MIGRATIONS_RUN=true` 自动应用迁移；生产环境应保持 `false`，在发布阶段单独运行迁移。每条 E2E 测试都会创建独立的内存数据库，不会互相残留，也不会污染本地学习数据。

## 阅读代码的正确方式

不要第一天通读整个 `src`。每一课会列出本课应该看的文件：先读讲义，再自己预测代码职责，然后运行请求，最后完成练习并看测试。当前仓库保存的是“最终成品”，不是 17 份重复项目；课程会明确说明前一阶段可以怎样用内存实现，再对照最终的数据库实现理解演进理由。

## 项目结构

```text
src/
├── main.ts                 # 应用启动与全局能力
├── app.setup.ts            # 生产与 E2E 共用的 HTTP 配置
├── app.module.ts           # 根模块和依赖装配
├── common/                 # 装饰器、Guard、Filter、中间件、拦截器
├── config/                 # 配置定义和环境变量校验
├── database/               # DataSource 与迁移
└── modules/
    ├── auth/               # 注册、登录、JWT
    ├── users/              # 用户与密码数据边界
    ├── projects/           # 项目 CRUD 与所有权
    ├── tasks/              # 任务 CRUD、筛选和分页
    └── health/             # 存活与就绪检查
```

详细调用链见 [docs/architecture.md](./docs/architecture.md)，术语速查见 [docs/glossary.md](./docs/glossary.md)。

## 学习边界

主线刻意不加入微服务、GraphQL、队列和 CQRS。它们不是 NestJS 入门的前置知识；先真正理解模块、依赖注入和请求生命周期，再把这些作为扩展专题会更稳。
