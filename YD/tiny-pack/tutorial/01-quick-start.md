# 第一章：快速开始

> 5 分钟体验 TinyPack，理解打包工具的基本工作流程

## 运行你的第一个打包程序

### 步骤 1：查看示例代码

TinyPack 自带了一个完整的示例项目，让我们先看看它包含什么：

```javascript
// examples/src/index.js - 入口文件
import html from './readme.md';
import message, { slogan } from './data.js';

console.log('Markdown as HTML:', html);
console.log('Message:', message);
console.log('Slogan:', slogan);
```

```javascript
// examples/src/data.js - 依赖模块
export default 'Hello from TinyPack!';
export const slogan = 'Build tools made simple';
```

```markdown
# examples/src/readme.md - Markdown 文件
## Welcome to TinyPack
This is a markdown file that will be processed by a loader!
```

### 步骤 2：执行打包

```bash
# 在 tiny-pack 目录下运行
node bin/tinypack.js
```

你会看到类似这样的输出：

```
[plugin] 构建开始
[run] 构建开始...
[plugin] 生成产物
[emit] 已输出到 D:\project\es6\YD\tiny-pack\dist\bundle.js
[plugin] 完成
[done] ✅ 构建完成
```

### 步骤 3：运行打包后的代码

```bash
node dist/bundle.js
```

输出：

```
Markdown as HTML: <h1>Welcome to TinyPack</h1>
<h2>This is a markdown file that will be processed by a loader!</h2>
Message: Hello from TinyPack!
Slogan: Build tools made simple
```

## 发生了什么？

让我们一步步分解这个过程：

### 1. 配置文件解析

TinyPack 读取了 `examples/tinypack.config.js`：

```javascript
module.exports = {
  // 入口文件
  entry: path.resolve(__dirname, 'src/index.js'),

  // 输出配置
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },

  // Loader 配置：处理 .md 文件
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [path.resolve(__dirname, '../loaders/markdown-loader.js')],
      },
    ],
  },

  // 插件配置
  plugins: [new ConsoleLogPlugin()],
};
```

### 2. 依赖图构建

TinyPack 从入口文件开始，递归分析所有依赖：

```
index.js
  ├── readme.md (通过 markdown-loader 处理)
  └── data.js
```

### 3. 代码转换

每个模块都经过处理：

**原始代码**（ES6 Module）:
```javascript
import html from './readme.md';
export default 'Hello';
```

**转换后**（CommonJS）:
```javascript
const __tiny_pack_import_0 = require('./examples/src/readme.md');
const html = __tiny_pack_import_0 && __tiny_pack_import_0.__esModule
  ? __tiny_pack_import_0.default
  : __tiny_pack_import_0;

exports.default = 'Hello';
exports.__esModule = true;
```

### 4. Bundle 生成

所有模块被包装成一个自执行函数：

```javascript
(function(modules){
  function require(id){
    const [fn, mapping] = modules[id];
    function localRequire(relPath){
      return require(mapping[relPath]);
    }
    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }
  require(0); // 从入口开始执行
})([
  // 模块数组
  [function(require, module, exports){ /* index.js 代码 */ }, {...}],
  [function(require, module, exports){ /* data.js 代码 */ }, {...}],
  [function(require, module, exports){ /* readme.md 代码 */ }, {...}]
])
```

## 核心概念速览

### Compiler - 构建协调器

```javascript
class Compiler {
  run() {
    this.hooks.run.call();              // 🚀 构建开始
    const compilation = new Compilation(this.config);
    await compilation.build();           // 📦 构建依赖图
    await this.hooks.emit.promise();     // ✍️ 写入文件前
    fs.writeFileSync(outputFile, code);  // 💾 输出 bundle
    this.hooks.done.call();              // ✅ 构建完成
  }
}
```

### Compilation - 依赖收集器

```javascript
class Compilation {
  async build() {
    // 1. 从入口开始
    const entryModule = await this.buildModule(entry);
    this.modules.push(entryModule);

    // 2. 递归收集依赖（BFS 遍历）
    for (const mod of this.modules) {
      for (const dep of mod.deps) {
        if (!visited(dep)) {
          const depModule = await this.buildModule(dep);
          this.modules.push(depModule);
        }
      }
    }

    // 3. 生成最终 bundle
    this.bundleCode = bundler(this.modules);
  }
}
```

### Parser - 代码转换器

```javascript
class Parser {
  parse(source) {
    const ast = acorn.parse(source);  // 解析成 AST

    // 遍历 AST，转换 import/export
    walk.simple(ast, {
      ImportDeclaration: (node) => {
        // import → require
      },
      ExportDefaultDeclaration: (node) => {
        // export default → exports.default
      }
    });

    return { transformedCode, deps };
  }
}
```

### Loader - 资源转换器

```javascript
// markdown-loader.js
const { marked } = require('marked');

module.exports = function markdownLoader(source) {
  const html = marked.parse(source);
  // 返回 JS 模块代码
  return `module.exports = ${JSON.stringify(html)};`;
};
```

## 动手实验

### 实验 1：添加新模块

创建 `examples/src/utils.js`：

```javascript
export function greet(name) {
  return `Hello, ${name}!`;
}
```

在 `index.js` 中导入：

```javascript
import { greet } from './utils.js';
console.log(greet('TinyPack'));
```

重新打包并运行，观察依赖图的变化。

### 实验 2：观察转换过程

在 `core/Parser.js` 的 `handleImport` 函数中添加日志：

```javascript
const handleImport = (node) => {
  console.log('🔍 发现 import:', node.source.value);
  // ... 原有代码
};
```

重新运行打包，你会看到每个 import 语句的处理过程。

### 实验 3：修改 Loader

修改 `markdown-loader.js`，添加标题前缀：

```javascript
module.exports = function markdownLoader(source) {
  const html = marked.parse(source);
  const prefixed = '<h1>📚 TinyPack Docs</h1>' + html;
  return `module.exports = ${JSON.stringify(prefixed)};`;
};
```

### 实验 4：查看 Bundle 内部

打开 `dist/bundle.js`，找到：
- 自执行函数的结构
- `require` 函数的实现
- 每个模块的包装方式
- mapping 对象的作用

## 常见问题

### Q: 为什么要转换成 CommonJS？

A: 因为 Node.js 原生支持 CommonJS，而 ES6 Module 在 Node.js 中需要特殊配置。转换成 CommonJS 可以让 bundle 在任何环境运行。

### Q: Loader 的执行顺序是什么？

A: **从右到左，从下到上**（与 Webpack 一致）。如果配置：

```javascript
use: ['loader-a', 'loader-b']
```

执行顺序是：`loader-b` → `loader-a`

### Q: 如何支持更多文件类型？

A: 创建对应的 Loader！例如 JSON Loader：

```javascript
module.exports = function jsonLoader(source) {
  return `module.exports = ${source};`;
};
```

配置：

```javascript
rules: [
  { test: /\.json$/, use: ['./loaders/json-loader.js'] }
]
```

## 小结

通过这一章，你应该已经：

- ✅ 成功运行了 TinyPack 的打包示例
- ✅ 理解了打包的基本流程：配置 → 依赖收集 → 代码转换 → Bundle 生成
- ✅ 认识了四大核心组件：Compiler、Compilation、Parser、Loader
- ✅ 知道如何添加新模块和修改 Loader

## 下一步

准备深入了解每个组件的实现细节吗？让我们进入[第二章：核心架构深度剖析](./02-core-architecture.md)！
