# 第 00 课：认识 Nest CLI，和一个项目最初长什么样

## 为什么要专门讲这个

第 01 课一上来就是三个写好的文件：`main.ts`、`app.module.ts`、`app.controller.ts`，直接开始讲 Controller 是什么。这样做是为了让你第一节课就能专注在"应用怎么启动"这一件事上，但代价是跳过了一个更早的问题：**这些文件本来是怎么来的？旁边那些 `package.json`、`tsconfig.json`、`nest-cli.json` 是干嘛的？为什么会有一个几百 MB 的 `node_modules` 文件夹？**

这些不是 NestJS 独有的东西，而是几乎所有 Node.js 项目都有的"骨架"。跳过它们直接学 Controller，你能学会写代码，但每次打开一个新项目，看到这些配置文件还是会心里发慌。这一课就是把这层补上。读完这一课，再回去看第 01 课，你会清楚"三个文件"只是骨架里`src/` 目录下的一小部分，不是全部。

## 这一课不要求你先跑课程代码

课程 `lessons/` 目录下的每一课，都是已经帮你处理过的"快照"——它们共用同一份根目录的 `package.json`，不是一个个独立项目，所以这一课讲的"创建项目"这件事，你不会在 `lessons/` 里做。这一课是让你在**别的、随便一个空目录**里，自己动手体验一次真实的创建过程，感受完就可以删掉，不影响课程本身。

## 第一步：装 CLI

Nest 官方提供一个命令行工具，专门用来生成项目骨架、生成 Controller/Service 这类文件、以及本地编译运行。装法有两种：

```bash
# 方式一：全局装一次，以后随时用 nest 命令
npm install -g @nestjs/cli

# 方式二：不装，每次用 npx 临时下载执行（适合只想试一次）
npx @nestjs/cli new my-first-app
```

两种方式效果一样，装了全局版之后可以直接打 `nest`，省得每次多打几个字。

## 第二步：生成一个新项目

```bash
nest new my-first-app
```

执行后 CLI 会问你用哪个包管理器（npm/yarn/pnpm），随便选一个（这门课默认用 npm），然后它会：

1. 新建一个 `my-first-app` 文件夹。
2. 往里面写一整套骨架文件。
3. 自动帮你跑一次 `npm install`，把依赖都装好。

跑完之后，你会得到一个**已经能直接运行**的 Nest 项目——不用你手写一行代码，`npm run start:dev` 就能看到一个跑起来的服务。这就是脚手架工具的意义：省掉从零搭骨架的重复劳动，让你直接从"写业务代码"开始。

## 第三步：这些生成出来的文件都是什么

打开生成的文件夹，你会看到下面这些东西。挨个认一遍：

### 根目录的配置文件

| 文件 | 是什么 |
| --- | --- |
| `package.json` | 项目的"身份证"：项目名字、版本号、依赖了哪些包、以及一堆可以用 `npm run xxx` 执行的快捷命令（脚本）。 |
| `package-lock.json` | 精确记录了每个依赖包、以及依赖的依赖，具体装的是哪个版本号。有它在，团队里每个人、或者换一台电脑，`npm install` 装出来的东西才会完全一样，不会出现"我这能跑你那不能跑"。 |
| `node_modules/` | `npm install` 之后，所有依赖包的源码实际存放的地方。这个文件夹通常几百 MB 起步，**永远不会、也不应该**提交到 Git（`.gitignore` 里会写明排除它），因为它随时能靠 `package.json` + `package-lock.json` 重新装出来。 |
| `tsconfig.json` | TypeScript 编译器的全局配置：允许用哪些语法、编译成什么版本的 JS、严格模式开不开等等。 |
| `tsconfig.build.json` | 专门给"打包上线"用的一份编译配置，继承 `tsconfig.json`，但额外排除掉测试文件（`.spec.ts`）和 `test/` 目录——你不会想把测试代码也编译进最终要发布的产物里。 |
| `nest-cli.json` | 告诉 Nest CLI 你的源码根目录在哪（一般是 `src`），以及用什么方式编译。 |
| `eslint.config.mjs`（或 `.eslintrc.*`） | 代码风格和常见错误的检查规则，比如"变量声明了不用要报警"。 |
| `.prettierrc` | 代码自动格式化的规则，比如用单引号还是双引号、要不要在每一项后面加逗号。这门课根目录也有一份，就是控制你现在读的这些文件的格式。 |
| `.gitignore` | 告诉 Git 哪些文件/文件夹不需要纳入版本管理，`node_modules/`、编译产物 `dist/` 通常都在这里面。 |

### `src/` 目录：你真正会写代码的地方

一个刚生成的项目，`src/` 里大概长这样：

```text
src/
├── main.ts                  # 启动入口，对应第 01 课讲的那个
├── app.module.ts             # 根模块，对应第 01 课
├── app.controller.ts         # CLI 默认帮你生成的一个示例 Controller
├── app.service.ts            # CLI 默认帮你生成的一个示例 Service（对应第 03 课要讲的 Provider）
└── app.controller.spec.ts    # 一份示例单元测试（对应第 15 课要讲的内容）
```

对照一下：第 01 课给你的三个文件，其实就是把 CLI 默认生成的东西简化了一下（去掉了默认的 Service 和测试文件），方便你只盯着"应用怎么启动"这一件事。这不是偷懒，是有意筛选过的教学素材——但你要知道，真实项目起步时，这些文件本来都在。

### `test/` 目录：端到端测试放的地方

```text
test/
├── app.e2e-spec.ts    # 一份示例端到端测试（对应第 16 课）
└── jest-e2e.json      # 端到端测试专用的 Jest 配置，和 src 里的单元测试配置是分开的
```

## 第四步：`package.json` 里那些 `npm run xxx` 都是干嘛的

生成项目的 `package.json` 里会有一批预置好的脚本，几乎每个 Nest 项目都长这样：

| 命令 | 作用 |
| --- | --- |
| `npm run start` | 编译一次然后启动，不监听文件变化。 |
| `npm run start:dev` | 开发时最常用的一个：监听文件改动，改完自动重启，你会在后面每一课里一直用到它（或者课程自己封装的 `npm run lesson -- 数字`）。 |
| `npm run start:debug` | 带调试端口启动，方便接 VS Code 之类的调试器。 |
| `npm run start:prod` | 直接运行已经编译好的 `dist/main.js`，不再依赖 ts-node，线上部署用这个。 |
| `npm run build` | 把 TypeScript 编译成 JavaScript，输出到 `dist/` 目录。 |
| `npm run lint` | 跑一遍代码风格检查。 |
| `npm run test` | 跑单元测试（第 15 课）。 |
| `npm run test:e2e` | 跑端到端测试（第 16 课）。 |

这些脚本背后调用的都是 `nest` 这个 CLI 命令（比如 `nest start --watch`），`package.json` 只是把常用的组合存成一个好记的短名字，不用每次都手打一长串参数。

## 动手：现在就做一次

1. 在**任意一个跟这门课无关**的空文件夹里，执行 `npx @nestjs/cli new demo-app`（不想污染全局环境就不用装全局版）。
2. 生成完之后，对照上面的表格，把 `package.json`、`nest-cli.json`、`tsconfig.json`、`src/` 下每个文件都打开看一眼——不用看懂内容，只要确认自己能说出"这个文件大概是干嘛的"。
3. 执行 `npm run start:dev`，打开 `http://localhost:3000`，应该能看到默认的 `Hello World!`。
4. 确认完之后，这个 `demo-app` 文件夹可以直接删掉，它只是拿来热身的。

## 检查清单

- 你能说清楚 `nest new` 做了什么，跟你自己手动建文件夹、手动 `npm install` 有什么区别。
- 你能不看这份文档，说出 `package.json`、`node_modules`、`tsconfig.json`、`nest-cli.json` 各自大概是干嘛的。
- 你能解释为什么 `node_modules` 不需要、也不应该提交到 Git。
- 你知道第 01 课给你的三个文件，只是一个完整项目 `src/` 目录里的一部分，不是全部。

做到这几条，再去看 [第 01 课](../lessons/01-bootstrap/README.md)。以后不管是这门课的毕业项目，还是你自己以后随便起一个新项目，第一步永远是从这一课讲的 `nest new` 开始。
