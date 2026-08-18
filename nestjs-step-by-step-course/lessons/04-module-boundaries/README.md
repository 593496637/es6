# 第 04 课：Module 是业务边界

## 学习目标

- 区分文件夹整理和 Nest Module 运行时边界。
- 理解 `imports/controllers/providers/exports` 的职责。
- 能从根模块追踪到功能模块。

## 上一课为什么要继续拆

现在项目相关的 Controller 和 Service 都堆在根模块里，等你再加了任务、用户之后，根模块会变成一个什么都往里塞的杂物间。

## 本课核心

这一课把"项目"相关的东西搬进一个独立的 `ProjectsModule`：它自己声明"我有哪个 Controller、哪个 Service"，根模块只需要说"我要用 ProjectsModule 这个模块"就行，不用管它内部装了什么。

```text
AppModule imports ProjectsModule
                 ├─ ProjectsController
                 └─ ProjectsService
```

要注意的是：把文件挪到一个文件夹里，跟真正让 Nest 认出这是一个独立模块，是两码事——决定边界的是 Module 里那份"元数据"（也就是 `@Module()` 装饰器里写的那些配置），不是文件夹本身。

## 动手与比较

```bash
npm run lesson -- 04
curl http://localhost:3000/projects
```

比较第 03、04 课：运行行为几乎不变，但依赖图更清晰。沿着 `main → AppModule → ProjectsModule → Controller → Service` 口述一次。

## 课堂练习

画一个还没有实现的 TasksModule，写出它可能拥有的 Controller 和 Service。

## 常见错误

- 只移动文件却没有更新 import 路径和 Module 元数据。
- 把所有 Provider 都注册到 AppModule，失去领域边界。
- 以为导入一个 TypeScript 文件就等于导入 Nest Module。

## 自测题

- `imports`、`controllers`、`providers` 分别注册什么？
- 文件夹与 Module 哪个才是 Nest 的运行时边界？
- 根模块应该承担什么，不应该承担什么？

## 完成标准

- 行为与第 03 课一致。
- AppModule 只组合 ProjectsModule。
- 你能画出模块与模块内部成员的两层关系。
