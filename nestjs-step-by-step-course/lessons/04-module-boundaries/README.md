# 第 04 课：Module 是业务边界

## 学习目标

- 区分文件夹整理和 Nest Module 运行时边界。
- 理解 `imports/controllers/providers/exports` 的职责。
- 能从根模块追踪到功能模块。

## 上一课为什么要继续拆

根模块里塞着项目 Controller 和 Service。加入任务、用户后会变成杂物间。

## 本课核心

把项目领域移动到 `src/projects`，由 `ProjectsModule` 声明自己的 Controller 和 Provider；根模块只负责组合。

```text
AppModule imports ProjectsModule
                 ├─ ProjectsController
                 └─ ProjectsService
```

类被放进文件夹不会自动生效，真正的边界是 Module 元数据。

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
