# 第 15 课：单元测试——隔离一条业务规则

## 学习目标

- 使用 TestingModule 构造被测 Service。
- 用 `getRepositoryToken()` 替换真实 Repository。
- 优先测试安全和业务行为，而不是实现细节或覆盖率数字。

## 测试不是“最后点一下运行”

单元测试的价值是快速证明一个小单元的行为。Nest TestingModule 创建与真实应用一致的依赖注入容器，但 Repository、JwtService 等外部边界用 mock 替代。

## 本课测试什么

- ProjectsService 查询时必须把 `ownerId` 放入数据库条件。
- 不存在和越权使用同一个 404。
- AuthService 正确密码只签发 `{ sub }`。
- 错误凭证返回 401。

这些是安全和业务规则，不是为了追求漂亮的覆盖率数字。

## 运行

```bash
npm run lesson:test -- 15
```

## AAA 结构

每个测试尽量分三段：

1. Arrange：准备依赖和输入。
2. Act：调用被测方法。
3. Assert：检查返回值、异常和依赖调用参数。

## Mock 的边界

单元测试不证明 TypeORM 真能连 SQLite，也不证明 HTTP 路由正确。它只证明 Service 在依赖给定结果时如何决策。下一课用 E2E 覆盖整条链路。

## 课堂练习

为 TasksService 写一个测试：用户访问任务时必须先以 `ownerId + projectId` 检查父项目，再以 `id + projectId` 查询任务。

## 常见错误

- 单元测试连接真实数据库，变慢且难隔离。
- 只断言返回值，不检查关键查询条件。
- mock 太多内部私有步骤，重构代码就全部失败。
- 为追求 100% 覆盖率测试无意义的 getter，却遗漏权限规则。

## 自测题

- Provider token 为什么必须与 `@InjectRepository(Project)` 对应？
- 单元测试能证明路由装饰器正确吗？
- 什么时候应该用 `toHaveBeenCalledWith`，什么时候只断言结果？

## 完成标准

- 你能解释为什么 Repository 被 mock。
- 故意删除 Service 查询条件中的 `ownerId`，测试会失败。
- 测试之间不共享可变状态。

## 官方延伸阅读

- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [NestJS TypeORM testing](https://docs.nestjs.com/techniques/database#testing)
