# 第二章：核心架构深度剖析

> 深入理解 TinyPack 的四大核心组件及其协作方式

## 整体架构概览

TinyPack 的架构类似于一个生产流水线，每个组件负责特定的任务：

```
┌────────────────────────────────────────────────────────────┐
│                         CLI 层                              │
│  读取配置、创建 Compiler、启动构建                          │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────────┐
│                      Compiler 层                            │
│  生命周期管理、插件调度、文件写入                           │
│  Hook: run → emit → done                                   │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────────┐
│                    Compilation 层                           │
│  依赖图构建、模块收集、Bundle 生成                          │
└────────────┬───────────────────┬───────────────────────────┘
             │                   │
             ▼                   ▼
   ┌──────────────┐      ┌──────────────┐
   │ LoaderRunner │      │    Parser    │
   │  资源转换     │      │  代码转换     │
   └──────────────┘      └──────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │   Bundler    │
                      │  运行时生成   │
                      └──────────────┘
```

## 一、Compiler - 构建流程的指挥中心

### 职责

Compiler 是整个构建流程的总指挥，负责：

1. **配置管理**：接收并保存用户配置
2. **插件注册**：初始化插件系统，调用插件的 `apply` 方法
3. **生命周期控制**：按顺序触发各个构建阶段的钩子
4. **文件输出**：将最终的 bundle 写入磁盘

### 核心源码解析

```javascript
// core/Compiler.js
class Compiler {
  constructor(config) {
    this.config = config;
    // 创建钩子系统
    this.hooks = new HookSystem().hooks;

    // 注册所有插件
    if (config.plugins && Array.isArray(config.plugins)) {
      config.plugins.forEach((plugin) => plugin.apply(this));
    }
  }

  run() {
    // 🚀 阶段 1: run - 构建开始
    this.hooks.run.call();
    console.log('[run] 构建开始...');

    // 📦 阶段 2: 创建 Compilation 并构建
    const compilation = new Compilation(this.config);
    compilation.build().then(() => {

      // ✍️ 阶段 3: emit - 写入文件前
      this.hooks.emit.promise().then(() => {

        // 💾 写入 bundle 到磁盘
        const outputFile = path.join(
          this.config.output.path,
          this.config.output.filename
        );
        fs.writeFileSync(outputFile, compilation.bundleCode, 'utf-8');
        console.log(`[emit] 已输出到 ${outputFile}`);

        // ✅ 阶段 4: done - 构建完成
        this.hooks.done.call();
        console.log('[done] ✅ 构建完成');
      });
    });
  }
}
```

### 生命周期钩子详解

TinyPack 使用 `tapable` 库实现钩子系统（与 Webpack 相同）：

```javascript
// core/HookSystem.js
const { SyncHook, AsyncSeriesHook } = require('tapable');

class HookSystem {
  constructor() {
    this.hooks = {
      // 同步钩子：构建开始时触发
      run: new SyncHook(),

      // 异步串行钩子：写入文件前触发，插件可以修改产物
      emit: new AsyncSeriesHook(),

      // 同步钩子：构建完成时触发
      done: new SyncHook(),
    };
  }
}
```

### 插件如何接入？

插件通过 `tap` 方法注册到钩子上：

```javascript
// plugins/ConsoleLogPlugin.js
class ConsoleLogPlugin {
  apply(compiler) {
    // 注册到同步钩子
    compiler.hooks.run.tap('ConsoleLogPlugin', () => {
      console.log('[plugin] 构建开始');
    });

    // 注册到异步钩子
    compiler.hooks.emit.tapPromise('ConsoleLogPlugin', async () => {
      console.log('[plugin] 生成产物');
    });

    compiler.hooks.done.tap('ConsoleLogPlugin', () => {
      console.log('[plugin] 完成');
    });
  }
}
```

### 时序图

```
用户运行 CLI
    │
    ▼
new Compiler(config)
    │
    ├──> 创建 HookSystem
    │
    ├──> 注册插件
    │      └──> plugin.apply(compiler)
    │             └──> compiler.hooks.xxx.tap()
    │
    ▼
compiler.run()
    │
    ├──> hooks.run.call() ──────────> [插件: 构建开始回调]
    │
    ├──> new Compilation(config)
    │      └──> compilation.build()
    │             └──> 收集模块、生成 bundle
    │
    ├──> hooks.emit.promise() ─────> [插件: 修改产物回调]
    │
    ├──> fs.writeFileSync()
    │
    └──> hooks.done.call() ────────> [插件: 构建完成回调]
```

## 二、Compilation - 依赖图的构建器

### 职责

Compilation 是每次构建的核心，负责：

1. **依赖图构建**：从入口文件开始，递归收集所有依赖
2. **模块处理**：通过 Loader 和 Parser 处理每个模块
3. **模块标准化**：将所有模块统一为 `{ filename, code, deps }` 格式
4. **Bundle 生成**：调用 bundler 生成最终产物

### 核心源码解析

```javascript
// core/Compilation.js
class Compilation {
  constructor(config) {
    this.config = config;
    this.modules = [];  // 存储所有模块
  }

  async build() {
    // 1️⃣ 构建入口模块
    const entryPath = this.config.entry;
    const entryModule = await this.buildModule(entryPath);
    this.modules.push(entryModule);

    // 2️⃣ BFS 遍历依赖图
    // 使用 for...of 循环，可以在遍历过程中动态添加元素
    for (const mod of this.modules) {
      for (const dep of mod.deps) {
        // 检查是否已处理过
        if (!this.modules.find((m) => m.filename === dep)) {
          const depAbsPath = path.resolve(process.cwd(), dep);
          const depModule = await this.buildModule(depAbsPath);
          this.modules.push(depModule);
        }
      }
    }

    // 3️⃣ 生成 Bundle
    this.bundleCode = bundler(this.modules, entryModule.filename);
  }

  async buildModule(filename) {
    // 读取源码
    let source = fs.readFileSync(filename, 'utf-8');

    // 计算相对 ID（用于模块标识）
    const relId = './' + path.relative(process.cwd(), filename)
      .replace(/\\/g, '/');

    // 🔧 运行 Loaders
    const { rules } = this.config.module || {};
    if (rules) {
      for (const rule of rules) {
        if (rule.test.test(filename)) {
          const runner = new LoaderRunner(rule.use);
          source = await runner.runLoaders(source);
        }
      }
    }

    // 🔄 解析和转换代码
    const parser = new Parser();
    const { transformedCode, deps } = parser.parse(
      source,
      path.dirname(filename)
    );

    // 返回标准化的模块描述
    return {
      filename: relId,      // 模块标识（相对路径）
      code: transformedCode, // 转换后的代码
      deps                   // 依赖列表
    };
  }
}
```

### 依赖图构建过程

假设有以下文件结构：

```
src/
  ├── index.js
  ├── data.js
  └── readme.md
```

构建过程：

```javascript
// 初始状态
modules = []

// 第 1 步：处理入口
modules = [
  { filename: './examples/src/index.js', deps: ['./examples/src/readme.md', './examples/src/data.js'], code: '...' }
]

// 第 2 步：遍历 index.js 的依赖
// 处理 ./examples/src/readme.md
modules = [
  { filename: './examples/src/index.js', deps: [...], code: '...' },
  { filename: './examples/src/readme.md', deps: [], code: '...' }
]

// 继续处理 ./examples/src/data.js
modules = [
  { filename: './examples/src/index.js', deps: [...], code: '...' },
  { filename: './examples/src/readme.md', deps: [], code: '...' },
  { filename: './examples/src/data.js', deps: [], code: '...' }
]

// 第 3 步：检查 readme.md 和 data.js 的依赖（都为空）
// 遍历结束
```

### BFS vs DFS

TinyPack 使用 **BFS（广度优先搜索）**：

```javascript
// BFS 实现
for (const mod of this.modules) {  // 按层遍历
  for (const dep of mod.deps) {
    if (!visited(dep)) {
      this.modules.push(buildModule(dep));
    }
  }
}
```

优点：
- 代码简洁，易于理解
- 同层模块可以并行处理（优化空间）
- 依赖深度相同的模块会被连续处理

Webpack 使用 **DFS（深度优先搜索）**：
- 优先处理完整的依赖链
- 更早发现循环依赖
- 适合复杂的依赖关系

## 三、LoaderRunner - 资源转换器

### 职责

LoaderRunner 负责：

1. **执行 Loader 链**：按配置顺序执行多个 Loader
2. **支持异步**：Loader 可以返回 Promise
3. **倒序执行**：从右到左执行（与 Webpack 一致）

### 核心源码解析

```javascript
// core/LoaderRunner.js
class LoaderRunner {
  constructor(loaders) {
    // 确保 loaders 是数组
    this.loaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  async runLoaders(source) {
    let code = source;

    // 🔄 倒序执行（从右到左）
    for (let i = this.loaders.length - 1; i >= 0; i--) {
      const loaderPath = this.loaders[i];
      const loader = require(path.resolve(loaderPath));

      // 支持同步和异步 Loader
      code = await Promise.resolve(loader(code));
    }

    return code;
  }
}
```

### Loader 编写示例

#### 简单的 JSON Loader

```javascript
// loaders/json-loader.js
module.exports = function jsonLoader(source) {
  // 直接返回 JS 模块代码
  return `module.exports = ${source};`;
};
```

使用：

```javascript
// tinypack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.json$/, use: ['./loaders/json-loader.js'] }
    ]
  }
};
```

#### Markdown Loader

```javascript
// loaders/markdown-loader.js
const { marked } = require('marked');

module.exports = function markdownLoader(source) {
  // 将 Markdown 转换为 HTML
  const html = marked.parse(source);

  // 返回导出 HTML 字符串的 JS 代码
  return `module.exports = ${JSON.stringify(html)};`;
};
```

#### 异步 Loader 示例

```javascript
// loaders/async-loader.js
module.exports = async function asyncLoader(source) {
  // 模拟异步操作（如网络请求）
  await new Promise(resolve => setTimeout(resolve, 100));

  return `/* 异步处理完成 */\n${source}`;
};
```

### Loader 链执行

配置多个 Loader：

```javascript
rules: [
  {
    test: /\.txt$/,
    use: ['loader-a.js', 'loader-b.js', 'loader-c.js']
  }
]
```

执行顺序：`loader-c` → `loader-b` → `loader-a`

```javascript
原始内容
   ↓
loader-c (添加时间戳)
   ↓
loader-b (压缩空白)
   ↓
loader-a (转换为 JS 模块)
   ↓
最终代码
```

## 四、Parser - 代码转换引擎

### 职责

Parser 是最复杂的组件，负责：

1. **AST 解析**：使用 Acorn 将代码解析为 AST
2. **语法转换**：将 ES6 Module 转换为 CommonJS
3. **依赖收集**：提取所有 import 路径
4. **代码生成**：使用 MagicString 生成转换后的代码

### 转换规则

#### 1. import 转换

```javascript
// 原始代码
import html from './readme.md';
import { slogan } from './data.js';
import * as utils from './utils.js';

// 转换后
const __tiny_pack_import_0 = require('./examples/src/readme.md');
const html = __tiny_pack_import_0 && __tiny_pack_import_0.__esModule
  ? __tiny_pack_import_0.default
  : __tiny_pack_import_0;

const __tiny_pack_import_1 = require('./examples/src/data.js');
const { slogan } = __tiny_pack_import_1;

const __tiny_pack_import_2 = require('./examples/src/utils.js');
const utils = __tiny_pack_import_2;
```

#### 2. export default 转换

```javascript
// 原始代码
export default 'Hello';

// 转换后
exports.default = 'Hello';
exports.__esModule = true;
```

```javascript
// 原始代码
export default function greet() { }

// 转换后
function greet() { }
exports.default = greet;
exports.__esModule = true;
```

#### 3. export named 转换

```javascript
// 原始代码
export const name = 'TinyPack';
export function hello() { }

// 转换后
const name = 'TinyPack';
exports.name = name;

function hello() { }
exports.hello = hello;
```

### 为什么需要 `__esModule` 标记？

为了区分 ES6 Module 和 CommonJS：

```javascript
// ES6 默认导入
import foo from './module';

// 需要判断是 ES6 Module 还是 CommonJS
const foo = module.__esModule ? module.default : module;
```

这样才能正确处理：

```javascript
// ES6 Module
export default 'value';  // → exports.default = 'value'

// CommonJS
module.exports = 'value';  // → 直接使用
```

## 五、Bundler - 运行时生成器

### 职责

Bundler 将所有模块打包成一个自执行函数，包含：

1. **模块映射**：为每个模块分配数字 ID
2. **依赖映射**：记录模块间的依赖关系
3. **运行时实现**：提供 `require` 函数
4. **入口执行**：自动执行入口模块

### 核心实现

```javascript
// core/bundler.js
function bundler(modules, entry) {
  // 1️⃣ 为每个模块分配 ID
  const moduleIds = {};
  modules.forEach((mod, i) => {
    moduleIds[mod.filename] = i;
  });

  // 2️⃣ 生成模块数组
  const moduleEntries = modules.map((mod) => {
    // 构建依赖映射：相对路径 → 模块 ID
    const mapping = {};
    mod.deps.forEach((dep) => {
      mapping[dep] = moduleIds[dep];
    });

    // 返回 [函数, 映射] 的字符串表示
    return `[
      function(require, module, exports){
        ${mod.code}
      },
      ${JSON.stringify(mapping)}
    ]`;
  }).join(',\n');

  // 3️⃣ 获取入口模块 ID
  const entryId = moduleIds[entry] ?? 0;

  // 4️⃣ 生成自执行函数
  return `
(function(modules){
  // 模块缓存
  const cache = {};

  // require 函数实现
  function require(id){
    // 如果已缓存，直接返回
    if (cache[id]) {
      return cache[id].exports;
    }

    // 取出模块的 [函数, 映射]
    const [fn, mapping] = modules[id];

    // 创建局部 require，用于解析相对路径
    function localRequire(relativePath){
      const moduleId = mapping[relativePath];
      return require(moduleId);
    }

    // 创建 module 对象
    const module = { exports: {} };

    // 缓存模块
    cache[id] = module;

    // 执行模块函数
    fn(localRequire, module, module.exports);

    // 返回 exports
    return module.exports;
  }

  // 从入口模块开始执行
  require(${entryId});
})([${moduleEntries}]);
  `.trim();
}
```

### 运行时工作原理

#### 模块数组结构

```javascript
[
  // 模块 0: index.js
  [
    function(require, module, exports){
      const data = require('./examples/src/data.js');
      console.log(data);
    },
    { './examples/src/data.js': 1 }  // 依赖映射
  ],

  // 模块 1: data.js
  [
    function(require, module, exports){
      exports.default = 'Hello';
      exports.__esModule = true;
    },
    {}  // 无依赖
  ]
]
```

#### 执行流程

```javascript
// 1. 执行 require(0) - 入口模块
require(0)
  └──> 取出 modules[0]
  └──> 执行 modules[0][0](localRequire, module, exports)
       └──> 调用 require('./examples/src/data.js')
            └──> localRequire 查找 mapping
            └──> 找到 ID = 1
            └──> 调用 require(1)
                 └──> 取出 modules[1]
                 └──> 执行并返回 exports
       └──> 获得 data 对象
       └──> console.log(data)
```

#### 为什么需要 localRequire？

因为每个模块使用的是相对路径：

```javascript
// index.js 中
require('./data.js')  // 相对于 index.js 的路径

// 通过 mapping 转换为绝对 ID
mapping['./examples/src/data.js'] → 1
```

#### 模块缓存机制

```javascript
const cache = {};

function require(id) {
  if (cache[id]) {
    return cache[id].exports;  // 避免重复执行
  }
  // ...
  cache[id] = module;
  // ...
}
```

防止循环依赖导致无限递归：

```javascript
// a.js
const b = require('./b.js');

// b.js
const a = require('./a.js');  // 返回缓存中的 a（可能未完全初始化）
```

## 组件协作流程

让我们通过一个完整的示例看看各组件如何协作：

```javascript
// 输入
import message from './data.js';
console.log(message);

// data.js
export default 'Hello';
```

### 流程分解

```
1. CLI 读取配置 → 创建 Compiler
   └──> new Compiler(config)

2. Compiler.run() 启动构建
   └──> hooks.run.call()  [插件介入]
   └──> new Compilation(config)

3. Compilation.build() 构建依赖图
   └──> buildModule('./src/index.js')
        ├──> fs.readFileSync()  // 读取文件
        ├──> LoaderRunner.runLoaders()  // 应用 Loader
        └──> Parser.parse()  // 解析转换
             ├──> acorn.parse()  // 生成 AST
             ├──> walk.simple(ast, {...})  // 遍历转换
             └──> 返回 { transformedCode, deps }
   └──> 发现依赖 './data.js'
   └──> buildModule('./src/data.js')
        └──> 重复上述过程

4. bundler(modules) 生成 Bundle
   └──> 分配模块 ID
   └──> 构建依赖映射
   └──> 生成自执行函数

5. Compiler 写入文件
   └──> hooks.emit.promise()  [插件介入]
   └──> fs.writeFileSync()
   └──> hooks.done.call()  [插件介入]
```

## 动手实验

### 实验 1：添加构建统计

修改 Compiler，记录构建时间：

```javascript
run() {
  const startTime = Date.now();
  this.hooks.run.call();

  // ... 构建过程

  this.hooks.done.call();
  console.log(`⏱️ 构建用时: ${Date.now() - startTime}ms`);
}
```

### 实验 2：实现模块统计插件

```javascript
class StatsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('StatsPlugin', () => {
      const compilation = compiler.compilation;
      console.log(`📊 共处理 ${compilation.modules.length} 个模块`);

      compilation.modules.forEach(mod => {
        console.log(`   - ${mod.filename}`);
      });
    });
  }
}
```

### 实验 3：实现 CSS Loader

```javascript
// loaders/css-loader.js
module.exports = function cssLoader(source) {
  // 转义特殊字符
  const css = JSON.stringify(source);

  // 返回注入样式的代码
  return `
    const style = document.createElement('style');
    style.textContent = ${css};
    document.head.appendChild(style);
    module.exports = ${css};
  `;
};
```

### 实验 4：可视化依赖图

在 Compilation.build() 结束后，生成 DOT 格式：

```javascript
generateDepGraph() {
  let dot = 'digraph G {\n';
  this.modules.forEach(mod => {
    mod.deps.forEach(dep => {
      dot += `  "${mod.filename}" -> "${dep}";\n`;
    });
  });
  dot += '}';
  fs.writeFileSync('deps.dot', dot);
}
```

使用 Graphviz 可视化：

```bash
dot -Tpng deps.dot -o deps.png
```

## 小结

本章深入剖析了 TinyPack 的四大核心组件：

- **Compiler**：生命周期管理和插件系统
- **Compilation**：依赖图构建和模块收集
- **LoaderRunner** 和 **Parser**：资源转换和代码转换
- **Bundler**：运行时生成

关键要点：

- ✅ 理解各组件的职责边界
- ✅ 掌握 BFS 依赖图构建算法
- ✅ 了解 Loader 链的执行机制
- ✅ 认识 CommonJS 运行时的实现

## 下一步

想深入理解 AST 转换的魔法吗？让我们进入[第三章：Parser 与 AST 转换详解](./03-parser-ast.md)！
