# 第 06 课：DTO 与输入验证

## 学习目标

- 区分 TypeScript 静态类型与运行时验证。
- 理解 DTO、ValidationPipe 和 Controller 的配合。
- 能解释白名单、拒绝额外字段和转换选项。

## 这节课解决什么问题

前面一直是"客户端发什么，程序就信什么"，这在真实场景里很危险——万一别人乱传数据类型，或者夹带了不该有的字段（比如偷偷传一个 `admin: true`）呢？这一课就是解决这个问题：先写一个"合同"（DTO），再打开一个全局的校验开关（ValidationPipe），让它在数据真正进到 Controller 之前先检查一遍。

## 本课新增

- `CreateTaskDto` 规定创建任务只能传哪些字段。
- `UpdateTaskDto` 规定更新时哪些字段是可选的。
- `ValidationPipe` 负责白名单过滤、拒绝多余字段、做类型转换。

## 先读代码

1. `src/tasks/dto/create-task.dto.ts`
2. `src/tasks/dto/update-task.dto.ts`
3. `src/tasks/tasks.controller.ts`
4. `src/main.ts`

这里有个容易搞混的点：TypeScript 写的类型（比如 `{ name: string }`）只在你写代码的时候帮你检查，程序真正跑起来接收到的 JSON 是不是真符合这个类型，TypeScript 是不管的——运行时的检查，必须靠 DTO 加 ValidationPipe 来做。另外 DTO 和 Entity 也不是一回事：DTO 是"进入系统的数据合同"，Entity 是"数据库里的数据模型"，第 10 课你会正式见到 Entity，到时候再回头对比。

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
