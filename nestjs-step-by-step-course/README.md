# NestJS 逐课代码演进课程

这套课程不是让你第一天面对完整项目。`lessons` 下每个目录都是一个可以独立阅读、独立运行的代码快照；后一课只增加一个主要概念。

## 开始之前

如果你还没用过 Nest CLI，不知道 `package.json`、`node_modules`、`tsconfig.json` 这些文件是干嘛的，先读 [第 00 课：认识 Nest CLI，和一个项目最初长什么样](docs/00-cli-and-project-anatomy.md)。第 01 课会直接给你三个写好的文件开始讲 Controller，不会再解释这些文件从哪来。

## 开始方式

```bash
cd /Users/likaikai/project/es6/nestjs-step-by-step-course
npm install
npm run lesson -- 01
```

然后先阅读 `lessons/01-bootstrap/README.md`，再访问讲义给出的地址。结束当前服务用 `Ctrl+C`，下一课运行 `npm run lesson -- 02`。

从第 02 课开始，可以只看相对上一课改了什么：

```bash
npm run lesson:diff -- 02
```

默认只比较相邻两课的 `src`，避免讲义文字淹没代码。第 15～17 课还会新增测试和配置，需要完整比较时使用：

```bash
npm run lesson:diff:all -- 16
```

## 学习前提

建议你已经掌握：

- JavaScript 的对象、数组、函数、`async/await`。
- TypeScript 的基础类型、class、interface 和泛型概念。
- HTTP method、URL、JSON、状态码的基本含义。

不要求你提前会装饰器、依赖注入、数据库或 JWT；这些都会在对应课程从用途讲起。

课程中遇到陌生词，可查阅 [术语表](docs/glossary.md)。

## 三种目录分别做什么

```text
nestjs-step-by-step-course/
├── lessons/01...17          每课冻结的可运行快照
├── scripts/                 启动、比较、测试课程的工具
└── ../nestjs-learning-demo  完整成品，不作为入门阅读起点
```

请在自己的练习分支或临时副本完成课后题。课程快照的作用是让你随时能回到标准答案，不建议一边学习一边把快照改得无法比较。

## 老师式学习循环

每一课严格按这个顺序：

1. 先读“这节课解决什么问题”，不要先抄代码。
2. 运行上一课，感受它缺少什么。
3. 只查看本课“新增/变化的文件”。
4. 运行本课请求，观察输入与输出。
5. 不看答案完成练习，用验收题口述原理。
6. 能讲清楚后再进入下一课。

每课预计 45～90 分钟。代码少不等于可以快速跳过：真正的完成标准是能预测请求如何流动，并能在不看答案时复写核心部分。

## 课程地图

| 课次 | 主题           | 当课只引入的核心能力             |
| ---- | -------------- | -------------------------------- |
| 01   | 启动           | main、根 Module、Controller      |
| 02   | 路由           | method、path、param、body        |
| 03   | 依赖注入       | Controller 调用 Service          |
| 04   | 模块边界       | 独立 ProjectsModule              |
| 05   | 内存 CRUD      | 业务状态与 REST CRUD             |
| 06   | DTO 与 Pipe    | 输入验证、转换、白名单           |
| 07   | 异常与 Filter  | 404 和统一错误响应               |
| 08   | 请求生命周期   | Middleware、Interceptor          |
| 09   | 配置           | ConfigModule、Joi、环境变量      |
| 10   | 第一张数据表   | TypeORM、SQLite、Entity          |
| 11   | 关系与迁移     | Project、Task、一对多、Migration |
| 12   | 注册与登录     | User、bcrypt、JWT                |
| 13   | 认证与所有权   | 全局 Guard、Public、资源隔离     |
| 14   | 查询与 Swagger | 分页、筛选、排序、OpenAPI        |
| 15   | 单元测试       | TestingModule、mock、行为断言    |
| 16   | E2E 测试       | 真实 HTTP、隔离数据库            |
| 17   | 生产准备       | Helmet、CORS、限流、健康检查     |

完整成品仍保存在相邻目录 `../nestjs-learning-demo`；学习期间不要提前照抄它。

## 第 17 课之后：毕业项目

17 课练习都在同一份 TaskFlow 代码上做小修改，只能证明"你能读懂它"，证明不了"你能不能独立搭一个新后端"。完成第 17 课后，去看 [capstone/README.md](capstone/README.md)：换一个陌生领域，从空文件夹开始，把这套架构自己重新组装一遍。组装不起来的地方，就是要回头补的地方。

## 卡住时怎样排查

- 端口被占用：`PORT=3101 npm run lesson -- 01`。
- 不知道本课改了什么：`npm run lesson:diff -- 课号`。
- 类型是否正确：`npm run check`。
- 第 15 课以后运行测试：`npm run lesson:test -- 15`。
- 服务没有退出：回到启动服务的终端按 `Ctrl+C`。

如果命令报错，先读错误的第一处项目文件和行号，不要立刻重装全部依赖。
