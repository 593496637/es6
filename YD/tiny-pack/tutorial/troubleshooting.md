# 故障排查指南

> 常见问题、错误诊断和解决方案

## 快速诊断

### 问题分类

根据错误信息快速定位问题类型：

- 🔴 **运行时错误**：`require is not defined`、`module is not defined`
- 🟡 **转换错误**：`Unexpected token`、`export/import` 未转换
- 🟢 **配置错误**：文件路径错误、Loader 未生效
- 🔵 **依赖错误**：循环依赖、模块未找到

## 一、常见错误及解决方案

### 1. `require is not defined`

**错误信息：**
```
ReferenceError: require is not defined in ES module scope
```

**原因：**
Bundle 中的 `require` 函数未正确生成或注入。

**诊断步骤：**

1. 检查 `dist/bundle.js` 是否包含 `require` 函数定义：

```javascript
function require(id){
  const [fn, mapping] = modules[id];
  // ...
}
```

2. 检查是否有自执行函数包装：

```javascript
(function(modules){
  // require 函数应该在这里
})([...])
```

**解决方案：**

确保 `core/bundler.js` 正确生成运行时：

```javascript
return `
(function(modules){
  function require(id){
    const [fn, mapping] = modules[id];
    function localRequire(relPath){ return require(mapping[relPath]); }
    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }
  require(${entryId});
})([${moduleEntries}]);
`.trim();
```

### 2. `Unexpected token 'export'`

**错误信息：**
```
SyntaxError: Unexpected token 'export'
```

**原因：**
ES6 Module 语法未被转换。

**诊断步骤：**

1. 检查 Parser 是否正确处理 export：

```bash
# 在 Parser.parse() 中添加日志
console.log('Processing AST nodes...');
```

2. 检查 `acorn-walk` 是否正确注册处理函数：

```javascript
walk.simple(ast, {
  ImportDeclaration: handleImport,
  ExportDefaultDeclaration: handleExportDefault,  // 确保注册
  ExportNamedDeclaration: handleExportNamed,      // 确保注册
});
```

**解决方案：**

确保所有 export 类型都被处理：

```javascript
// 检查转换后的代码
const { transformedCode, deps } = parser.parse(source, dirname);
console.log('Transformed:', transformedCode);

// 应该看到类似这样的输出：
// exports.default = ...;
// exports.__esModule = true;
```

### 3. `Cannot find module './xxx.js'`

**错误信息：**
```
Error: Cannot find module './examples/src/data.js'
```

**原因：**
模块路径解析错误。

**诊断步骤：**

1. 检查路径规范化：

```javascript
// 在 Parser 中添加日志
const toRelativeId = (importPath) => {
  const absPath = path.resolve(parentPath, importPath);
  const relPath = path.relative(process.cwd(), absPath);
  const relId = './' + relPath.replace(/\\/g, '/');

  console.log('📍 路径转换:');
  console.log('  importPath:', importPath);
  console.log('  absPath:', absPath);
  console.log('  relPath:', relPath);
  console.log('  relId:', relId);

  return relId;
};
```

2. 检查依赖映射：

```javascript
// 在 bundler.js 中
console.log('Module IDs:', moduleIds);
console.log('Mappings:', modules.map(m => ({ file: m.filename, deps: m.deps })));
```

**解决方案：**

确保路径一致性：

```javascript
// ✅ 正确：统一使用相对路径
'./examples/src/data.js'

// ❌ 错误：混用绝对路径
'D:\project\es6\YD\tiny-pack\examples\src\data.js'

// 修复：统一路径分隔符
.replace(/\\/g, '/')
```

### 4. `mapping[relPath] is undefined`

**错误信息：**
```
TypeError: Cannot read property 'undefined' of undefined
```

**原因：**
依赖映射中缺少某个模块。

**诊断步骤：**

1. 打印 mapping 对象：

```javascript
// 在 bundle 中添加调试代码
function localRequire(relPath){
  console.log('Requiring:', relPath);
  console.log('Mapping:', mapping);
  console.log('Mapped ID:', mapping[relPath]);
  return require(mapping[relPath]);
}
```

2. 检查依赖收集是否完整：

```javascript
// 在 Compilation.build() 中
console.log('All modules:', this.modules.map(m => m.filename));
console.log('All deps:', this.modules.flatMap(m => m.deps));
```

**解决方案：**

确保所有依赖都被收集：

```javascript
// 在 Compilation.buildModule 中
const deps = parser.parse(source, path.dirname(filename)).deps;
console.log(`📦 模块 ${filename} 的依赖:`, deps);

// 检查是否有遗漏
for (const dep of deps) {
  if (!this.modules.find(m => m.filename === dep)) {
    console.log('⚠️ 发现新依赖:', dep);
  }
}
```

### 5. Loader 未生效

**症状：**
Markdown 文件没有被转换，或者 CSS 未注入。

**诊断步骤：**

1. 检查规则匹配：

```javascript
// 在 Compilation.buildModule 中
const { rules } = this.config.module || {};
if (rules) {
  for (const rule of rules) {
    console.log(`Testing ${filename} against ${rule.test}`);
    if (rule.test.test(filename)) {
      console.log('✅ Match!');
    }
  }
}
```

2. 检查 Loader 执行：

```javascript
// 在 LoaderRunner.runLoaders 中
console.log('Running loaders:', this.loaders);
console.log('Source before:', source);
// ... 执行 loader
console.log('Source after:', code);
```

**解决方案：**

确保配置正确：

```javascript
// ✅ 正确
{
  test: /\.md$/,           // 正则表达式
  use: ['./loaders/markdown-loader.js']
}

// ❌ 错误
{
  test: '*.md',            // 字符串不会匹配
  use: 'markdown-loader'   // 相对路径错误
}

// 修复
{
  test: /\.md$/,
  use: [path.resolve(__dirname, './loaders/markdown-loader.js')]
}
```

### 6. 循环依赖问题

**症状：**
模块导出的值是 `undefined` 或不完整。

**示例：**

```javascript
// a.js
import { b } from './b.js';
export const a = 1;
console.log('b is:', b);  // undefined

// b.js
import { a } from './a.js';
export const b = 2;
console.log('a is:', a);  // undefined
```

**诊断步骤：**

1. 检测循环依赖：

```javascript
// 在 Compilation.build 中
const visited = new Set();
const visiting = new Set();

function detectCycle(filename) {
  if (visiting.has(filename)) {
    console.error('❌ 循环依赖检测到:', Array.from(visiting), filename);
    return true;
  }
  if (visited.has(filename)) return false;

  visiting.add(filename);
  const mod = this.modules.find(m => m.filename === filename);
  if (mod) {
    for (const dep of mod.deps) {
      if (detectCycle(dep)) return true;
    }
  }
  visiting.delete(filename);
  visited.add(filename);
  return false;
}
```

**解决方案：**

1. 重构代码避免循环依赖
2. 使用动态 import 打破循环
3. 提取共同依赖到第三个模块

```javascript
// 方案 1: 动态 import
// a.js
export const a = 1;
import('./b.js').then(({ b }) => {
  console.log('b is:', b);
});

// 方案 2: 提取共同依赖
// common.js
export const shared = {};

// a.js
import { shared } from './common.js';
export const a = 1;

// b.js
import { shared } from './common.js';
export const b = 2;
```

### 7. Plugin 钩子未触发

**症状：**
插件的回调函数没有执行。

**诊断步骤：**

1. 检查钩子类型和调用方式匹配：

```javascript
// ❌ 错误：SyncHook 使用 tapPromise
compiler.hooks.run.tapPromise('Plugin', async () => {});

// ✅ 正确：SyncHook 使用 tap
compiler.hooks.run.tap('Plugin', () => {});

// ✅ 正确：AsyncSeriesHook 使用 tapPromise
compiler.hooks.emit.tapPromise('Plugin', async () => {});
```

2. 确认钩子被调用：

```javascript
// 在 Compiler.run 中
console.log('Calling run hook...');
this.hooks.run.call();

console.log('Calling emit hook...');
await this.hooks.emit.promise();
```

**解决方案：**

```javascript
// 检查 HookSystem 定义
class HookSystem {
  constructor() {
    this.hooks = {
      run: new SyncHook(),                // 同步 → 用 tap
      emit: new AsyncSeriesHook(),        // 异步 → 用 tapPromise
      done: new SyncHook(),               // 同步 → 用 tap
    };
  }
}

// 插件中正确使用
class MyPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('MyPlugin', () => {
      console.log('Run hook triggered');
    });

    compiler.hooks.emit.tapPromise('MyPlugin', async () => {
      console.log('Emit hook triggered');
    });
  }
}
```

## 二、调试技巧

### 1. 启用详细日志

创建一个 Logger 工具：

```javascript
// utils/Logger.js
class Logger {
  constructor(enabled = true) {
    this.enabled = enabled;
  }

  log(tag, ...args) {
    if (this.enabled) {
      console.log(`[${tag}]`, ...args);
    }
  }

  error(tag, ...args) {
    console.error(`[${tag}]`, ...args);
  }
}

module.exports = new Logger(process.env.DEBUG === 'true');
```

使用：

```bash
DEBUG=true node bin/tinypack.js
```

### 2. 输出中间产物

在关键步骤保存中间结果：

```javascript
// 在 Compilation.buildModule 中
fs.writeFileSync(
  `debug/${path.basename(filename)}.transformed.js`,
  transformedCode,
  'utf-8'
);
```

### 3. 使用 Node.js 调试器

```bash
# 启动调试
node --inspect-brk bin/tinypack.js

# 然后在 Chrome 中打开
chrome://inspect
```

在代码中添加断点：

```javascript
debugger;  // 程序会在此处暂停
```

### 4. 可视化依赖图

生成 GraphViz 图：

```javascript
// 在 Compilation.build() 结束后
function visualizeDeps() {
  let dot = 'digraph G {\n';
  dot += '  rankdir=LR;\n';
  dot += '  node [shape=box];\n';

  this.modules.forEach(mod => {
    const label = path.basename(mod.filename);
    mod.deps.forEach(dep => {
      const depLabel = path.basename(dep);
      dot += `  "${label}" -> "${depLabel}";\n`;
    });
  });

  dot += '}';
  fs.writeFileSync('deps.dot', dot);
  console.log('📊 依赖图已生成: deps.dot');
  console.log('运行命令查看: dot -Tpng deps.dot -o deps.png');
}
```

### 5. 比对输出

将 TinyPack 的输出与 Webpack 对比：

```bash
# 用 Webpack 打包
npx webpack

# 用 TinyPack 打包
node bin/tinypack.js

# 对比 bundle 大小和结构
ls -lh dist/
```

## 三、性能问题

### 问题 1：构建速度慢

**诊断：**

```javascript
// 添加计时
const startTime = Date.now();
await this.buildModule(filename);
console.log(`⏱️ ${filename} 耗时: ${Date.now() - startTime}ms`);
```

**优化方案：**

1. 启用缓存
2. 并行构建
3. 减少 Loader 数量
4. 使用更快的解析器

### 问题 2：Bundle 体积大

**诊断：**

使用 BundleAnalyzerPlugin（见第四章）。

**优化方案：**

1. 启用代码压缩
2. Tree Shaking（高级功能）
3. 代码分割
4. 移除 Source Map（生产环境）

### 问题 3：内存占用高

**诊断：**

```bash
node --max-old-space-size=512 bin/tinypack.js
```

**优化方案：**

1. 流式处理大文件
2. 及时释放不用的对象
3. 使用 WeakMap/WeakSet

## 四、最佳实践

### 1. 错误处理

在关键位置添加 try-catch：

```javascript
async buildModule(filename) {
  try {
    let source = fs.readFileSync(filename, 'utf-8');
    // ...
  } catch (error) {
    console.error(`❌ 构建模块失败: ${filename}`);
    console.error(error);
    throw error;
  }
}
```

### 2. 配置验证

验证用户配置：

```javascript
function validateConfig(config) {
  if (!config.entry) {
    throw new Error('配置错误: 缺少 entry');
  }

  if (!config.output || !config.output.path) {
    throw new Error('配置错误: 缺少 output.path');
  }

  // 检查入口文件是否存在
  if (!fs.existsSync(config.entry)) {
    throw new Error(`入口文件不存在: ${config.entry}`);
  }
}
```

### 3. 提供友好的错误信息

```javascript
try {
  const loader = require(path.resolve(loaderPath));
} catch (error) {
  console.error(`
❌ 加载 Loader 失败
   路径: ${loaderPath}
   原因: ${error.message}

💡 建议:
   1. 检查 Loader 文件是否存在
   2. 检查路径是否正确
   3. 确保 Loader 导出了函数
  `);
  throw error;
}
```

### 4. 单元测试

为核心功能编写测试：

```javascript
// tests/parser.test.js
const Parser = require('../core/Parser');

test('should transform import statement', () => {
  const parser = new Parser();
  const source = "import foo from './bar.js';";

  const result = parser.parse(source, '/path/to');

  expect(result.transformedCode).toContain('require');
  expect(result.deps).toContain('./path/to/bar.js');
});
```

## 五、社区资源

### 参考文档

- [Acorn AST 规范](https://github.com/estree/estree)
- [Tapable 钩子类型](https://github.com/webpack/tapable)
- [Webpack 源码解析](https://webpack.js.org/concepts/)

### 调试工具

- [AST Explorer](https://astexplorer.net/) - 可视化 AST
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Source Map Visualization](https://sokra.github.io/source-map-visualization/)

### 常见问题 FAQ

**Q: TinyPack 支持 TypeScript 吗？**

A: 需要添加 TypeScript Loader（见第四章）。

**Q: 如何支持 CSS Modules？**

A: 在 CSS Loader 中处理类名转换和作用域。

**Q: 可以集成到现有项目吗？**

A: 可以，但建议用于学习和实验，生产环境使用 Webpack/Rollup。

**Q: 如何调试生成的 bundle？**

A: 启用 Source Map，或在 bundle 中添加 `debugger` 语句。

## 六、获取帮助

如果本指南无法解决你的问题：

1. 🐛 检查是否是已知问题
2. 💬 在项目 Issues 中搜索类似问题
3. 📝 提交新的 Issue，包含：
   - 错误信息
   - 复现步骤
   - 环境信息（Node.js 版本、操作系统）
   - 相关配置文件

## 小结

通过本指南，你应该能够：

- ✅ 快速诊断常见错误
- ✅ 使用调试工具定位问题
- ✅ 优化构建性能
- ✅ 遵循最佳实践

记住：大多数问题都源于：

1. 路径解析错误
2. 代码转换不完整
3. 配置错误
4. 插件/Loader 使用不当

保持耐心，仔细检查日志，你一定能解决问题！

---

**🎉 恭喜你完成了 TinyPack 教程的全部内容！**

现在你已经掌握了构建工具的核心原理，可以：

- 理解 Webpack 的工作机制
- 开发自定义 Loader 和 Plugin
- 优化构建性能
- 解决常见问题

继续探索，构建属于你自己的工具吧！
