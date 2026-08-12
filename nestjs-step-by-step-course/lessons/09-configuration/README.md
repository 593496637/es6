# 第 09 课：配置与环境变量

## 学习目标

- 把外部字符串配置转换成应用内可信值。
- 理解启动时失败优于运行时随机失败。
- 能用 ConfigService 消费集中配置。

## 这节课解决什么问题

端口、数据库地址和密钥不能散落在代码里。本课只引入 `ConfigModule`：读取环境、启动时校验、通过依赖注入消费配置。

## 本课新增

- `ConfigModule.forRoot()` 在根模块加载一次。
- Joi 在应用启动前检查环境变量。
- `ConfigService` 代替业务代码到处读取 `process.env`。
- `.env.example` 只列键名和安全示例，不保存真实秘密。

## 运行

```bash
npm run lesson -- 09
PORT=3109 npm run lesson -- 09
```

再故意传错：

```bash
PORT=not-a-port npm run lesson -- 09
```

应用应当直接拒绝启动，而不是运行到收到请求后才暴露错误。

## 为什么集中配置

`process.env` 的值永远来自字符串世界，缺失和拼写错误都很常见。集中配置能把“不确定的外部输入”转换成应用内部可信的值。

## 先读代码

1. `.env.example`
2. `src/app.module.ts` 中的 `ConfigModule.forRoot`
3. `src/main.ts` 中的 `ConfigService`

## 课堂练习

增加 `APP_NAME`，要求 2～30 个字符；启动后打印它，并尝试缺失和超长值。

## 常见错误

- 在多个 Service 中直接散读 `process.env`。
- 把真实 JWT secret 写进 `.env.example` 或提交 `.env`。
- 忘记环境变量最初都是字符串，对数字和布尔值不做转换。

## 自测题

- `isGlobal: true` 带来什么便利和代价？
- Joi 在什么时候运行？
- 为什么配置错误应阻止应用启动？

## 完成标准

- 你能解释为什么真实 `.env` 不应提交。
- 错误配置会在启动阶段失败。
- Controller/Service 不直接解析环境变量。

## 官方延伸阅读

- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
