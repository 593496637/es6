# 第 06 课：DTO 与输入验证

## 学习目标

- 区分 TypeScript 静态类型与运行时验证。
- 理解 DTO、ValidationPipe 和 Controller 的配合。
- 能解释白名单、拒绝额外字段和转换选项。

## 这节课解决什么问题

上一课直接相信 `@Body()`，客户端即使传错类型或夹带额外字段，程序也很难尽早发现。本课只新增 DTO 和全局 `ValidationPipe`，让 HTTP 边界先检查数据。

## 本课新增

- `CreateTaskDto` 描述创建任务允许的字段。
- `UpdateTaskDto` 描述可选更新字段。
- `ValidationPipe` 执行白名单、拒绝额外字段、类型转换。

## 先读代码

1. `src/tasks/dto/create-task.dto.ts`
2. `src/tasks/dto/update-task.dto.ts`
3. `src/tasks/tasks.controller.ts`
4. `src/main.ts`

DTO 是“进入系统的数据合同”，Entity 是“数据库里的数据模型”，两者不要混为一谈。

## 运行

```bash
npm run lesson -- 06
```

合法请求：

```bash
curl -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"学习 DTO"}'
```

故意失败：

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"","admin":true}'
```

## 你应该看懂

- 装饰器只声明规则，真正触发验证的是 `ValidationPipe`。
- `whitelist` 会处理合同外字段；`forbidNonWhitelisted` 选择直接报错。
- Controller 收到的是已经通过边界检查的数据。

## 课堂练习

给任务增加可选 `description`，要求是字符串且最多 500 字；分别验证不传、合法、超长三种情况。

## 常见错误

- 只写 class-validator 装饰器，却忘记安装 ValidationPipe。
- 把 Entity 直接当输入 DTO，导致数据库字段意外暴露。
- 误以为 `whitelist` 与 `forbidNonWhitelisted` 完全相同：前者决定剥离，后者决定是否直接报错。

## 自测题

- 为什么接口类型不能阻止 curl 传入错误 JSON？
- DTO 在请求链路的哪一层生效？
- `transform` 对 URL 参数和查询参数有什么帮助？

## 完成标准

- 空标题得到 400。
- 多传 `admin` 得到 400。
- 合法 DTO 仍能创建和更新任务。

## 官方延伸阅读

- [NestJS Validation](https://docs.nestjs.com/techniques/validation)
