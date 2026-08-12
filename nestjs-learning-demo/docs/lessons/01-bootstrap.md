# 第 01 课：启动一个 Nest 应用

## 本课目标

- 理解 `main.ts` 与根模块分别负责什么。
- 看懂应用创建、全局前缀配置和端口监听。
- 能独立判断“进程已启动”和“HTTP 接口可用”之间的区别。

## 心智模型

`main.ts` 是组装完成后的启动按钮，`AppModule` 是组装图。`NestFactory.create(AppModule)` 会读取模块元数据，构造依赖容器，再创建 HTTP 应用；`listen()` 之后操作系统才真正开放端口。

```text
main.ts → NestFactory → AppModule → 依赖图完成 → listen(port)
```

## 最终项目文件导航

- `src/main.ts`：创建应用并监听端口。
- `src/app.setup.ts`：生产启动与 E2E 共用的 HTTP 边界配置。
- `src/app.module.ts`：根模块及其 imports。
- `src/modules/health/health.controller.ts`：最简单的可用性入口。
- `src/modules/health/health.module.ts`：健康模块的装配范围。

## 核心讲解

Nest 不是扫描整个 `src` 后自动运行所有 class。一个类必须进入模块依赖图，才能由容器管理。根模块通过 `imports` 引入领域模块，领域模块再声明自己的 Controller 和 Provider。

全局前缀把业务地址统一放在 `/api` 下；HealthController 的 `health` 与方法的 `live` 再依次追加，最终形成 `/api/health/live`。端口来自配置时，开发和生产可使用不同值，而不需要改源代码。

启动阶段如果配置不合法或数据库无法初始化，应直接失败并打印原因；“带病启动”会把问题推迟到第一位用户请求。

## 动手步骤与练习

1. 安装依赖并启动开发模式：`npm install`、`npm run start:dev`。
2. 请求 `GET http://localhost:3000/api`，确认状态码与欢迎响应体；再请求 `/api/health/live`。
3. 从 `main.ts` 找到端口来源，再从 `AppModule` 找到健康模块。
4. 把全局前缀遮住后在脑中推导地址：Controller 路径怎样与 `/api` 合并？
5. 练习：写出应用启动失败时应优先检查的三项（Node 版本、环境配置、端口占用）。

## 验收清单

- [ ] `npm run build` 能完成。
- [ ] 我能解释 `NestFactory.create()` 与 `listen()` 的差别。
- [ ] 我能从 `AppModule` 追到 HealthController。
- [ ] 我知道为什么接口基地址是 `http://localhost:3000/api`。

## 常见误区

- **把 AppModule 当业务层**：它主要负责组合，不应堆积业务规则。
- **忽略异步启动错误**：bootstrap 应等待创建与监听结果。
- **只看终端“started”**：还要真实请求健康接口。
- **硬编码端口**：端口属于环境配置，后续会由 ConfigModule 管理。

## 下一课

应用已经能接请求；下一课研究 Controller 如何把方法、路径、参数和 HTTP 语义对应起来。
