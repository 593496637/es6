# 第四章：高级特性实现

> 扩展 TinyPack，添加更多实用功能

## 本章内容

在前三章中，我们实现了一个基础但完整的打包器。现在让我们添加更多高级特性：

- 🔧 复杂 Loader 的实现
- 🔌 高级插件开发
- 📦 代码分割（Code Splitting）
- 🗜️ 代码压缩
- 🗺️ Source Map 支持
- ⚡ 性能优化

## 一、高级 Loader 开发

### 1.1 CSS Loader

处理 CSS 文件，将样式注入到页面中。

```javascript
// loaders/css-loader.js
module.exports = function cssLoader(source) {
  // 转义特殊字符
  const css = JSON.stringify(source);

  // 生成 JS 代码：创建 style 标签并注入样式
  return `
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = ${css};
      document.head.appendChild(style);
    }
    module.exports = ${css};
  `;
};
```

使用：

```javascript
// tinypack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['./loaders/css-loader.js']
      }
    ]
  }
};
```

```javascript
// index.js
import './style.css';  // 样式会自动注入到 <head>
```

### 1.2 JSON Loader

处理 JSON 文件。

```javascript
// loaders/json-loader.js
module.exports = function jsonLoader(source) {
  // 验证 JSON 格式
  try {
    JSON.parse(source);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }

  // 返回 JS 模块
  return `module.exports = ${source};`;
};
```

### 1.3 Babel Loader（简化版）

使用 Babel 转换现代 JS 语法。

```javascript
// loaders/babel-loader.js
const babel = require('@babel/core');

module.exports = function babelLoader(source) {
  const result = babel.transformSync(source, {
    presets: ['@babel/preset-env'],
    // 不生成 Source Map（简化）
    sourceMaps: false
  });

  return result.code;
};
```

安装依赖：

```bash
npm install @babel/core @babel/preset-env
```

### 1.4 Loader Context（上下文对象）

为 Loader 提供更多功能：

```javascript
// core/LoaderRunner.js（增强版）
class LoaderRunner {
  constructor(loaders) {
    this.loaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  async runLoaders(source, context = {}) {
    let code = source;

    for (let i = this.loaders.length - 1; i >= 0; i--) {
      const loaderPath = this.loaders[i];
      const loader = require(path.resolve(loaderPath));

      // 创建 Loader 上下文
      const loaderContext = {
        // 当前处理的文件路径
        resourcePath: context.resourcePath || '',

        // 添加依赖（用于监听文件变化）
        addDependency: (file) => {
          context.dependencies = context.dependencies || [];
          context.dependencies.push(file);
        },

        // 发出警告
        emitWarning: (msg) => {
          console.warn(`[Loader Warning] ${msg}`);
        },

        // 发出错误
        emitError: (msg) => {
          console.error(`[Loader Error] ${msg}`);
        }
      };

      // 调用 Loader（绑定上下文）
      code = await Promise.resolve(loader.call(loaderContext, code));
    }

    return code;
  }
}
```

使用上下文的 Loader：

```javascript
// loaders/advanced-loader.js
module.exports = function advancedLoader(source) {
  // 访问文件路径
  console.log('Processing:', this.resourcePath);

  // 添加额外的依赖
  this.addDependency('./config.json');

  // 发出警告
  if (source.includes('TODO')) {
    this.emitWarning('File contains TODO comments');
  }

  return source;
};
```

### 1.5 Loader 链示例

处理 SCSS：`scss-loader` → `css-loader`

```javascript
// loaders/scss-loader.js
const sass = require('sass');

module.exports = function scssLoader(source) {
  const result = sass.compileString(source);
  return result.css;
};
```

配置：

```javascript
rules: [
  {
    test: /\.scss$/,
    use: [
      './loaders/css-loader.js',    // 最后执行：生成 JS
      './loaders/scss-loader.js'    // 先执行：SCSS → CSS
    ]
  }
]
```

## 二、高级插件开发

### 2.1 文件清理插件

每次构建前清理输出目录。

```javascript
// plugins/CleanPlugin.js
const fs = require('fs');
const path = require('path');

class CleanPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('CleanPlugin', () => {
      const outputPath = compiler.config.output.path;

      if (fs.existsSync(outputPath)) {
        // 删除目录中的所有文件
        const files = fs.readdirSync(outputPath);
        files.forEach(file => {
          fs.unlinkSync(path.join(outputPath, file));
        });
        console.log(`[CleanPlugin] 已清理 ${outputPath}`);
      }
    });
  }
}

module.exports = CleanPlugin;
```

### 2.2 Bundle 分析插件

生成打包分析报告。

```javascript
// plugins/BundleAnalyzerPlugin.js
const fs = require('fs');
const path = require('path');

class BundleAnalyzerPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BundleAnalyzerPlugin', () => {
      const compilation = compiler.compilation;

      // 统计每个模块的大小
      const stats = compilation.modules.map(mod => ({
        name: mod.filename,
        size: mod.code.length,
        deps: mod.deps.length
      }));

      // 计算总大小
      const totalSize = stats.reduce((sum, mod) => sum + mod.size, 0);

      // 生成报告
      const report = {
        totalModules: stats.length,
        totalSize,
        modules: stats.sort((a, b) => b.size - a.size)
      };

      // 写入 JSON 文件
      const reportPath = path.join(
        compiler.config.output.path,
        'bundle-report.json'
      );
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

      console.log(`[BundleAnalyzer] 报告已生成: ${reportPath}`);
      console.log(`📊 模块总数: ${report.totalModules}`);
      console.log(`📦 总大小: ${(totalSize / 1024).toFixed(2)} KB`);
    });
  }
}

module.exports = BundleAnalyzerPlugin;
```

### 2.3 压缩插件

使用 Terser 压缩代码。

```javascript
// plugins/TerserPlugin.js
const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

class TerserPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('TerserPlugin', async () => {
      const compilation = compiler.compilation;

      console.log('[TerserPlugin] 压缩中...');

      // 压缩 bundle 代码
      const result = await minify(compilation.bundleCode, {
        compress: true,
        mangle: true,
        ...this.options
      });

      if (result.code) {
        compilation.bundleCode = result.code;
        console.log('[TerserPlugin] 压缩完成');
      }
    });
  }
}

module.exports = TerserPlugin;
```

安装依赖：

```bash
npm install terser
```

使用：

```javascript
// tinypack.config.js
const TerserPlugin = require('./plugins/TerserPlugin');

module.exports = {
  plugins: [
    new TerserPlugin({
      compress: {
        drop_console: true,  // 删除 console.log
      }
    })
  ]
};
```

### 2.4 Watch 模式插件

监听文件变化，自动重新构建。

```javascript
// plugins/WatchPlugin.js
const chokidar = require('chokidar');

class WatchPlugin {
  constructor(options = {}) {
    this.options = {
      ignored: /node_modules/,
      ...options
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap('WatchPlugin', () => {
      if (!this.watcher) {
        const watchPaths = [
          compiler.config.entry,
          './loaders/**/*.js',
          './plugins/**/*.js'
        ];

        this.watcher = chokidar.watch(watchPaths, this.options);

        this.watcher.on('change', (path) => {
          console.log(`\n[WatchPlugin] 文件变化: ${path}`);
          console.log('[WatchPlugin] 重新构建...\n');

          // 清除 require 缓存
          Object.keys(require.cache).forEach(key => {
            if (!key.includes('node_modules')) {
              delete require.cache[key];
            }
          });

          // 重新执行构建
          compiler.run();
        });

        console.log('[WatchPlugin] 监听模式已启动');
      }
    });
  }
}

module.exports = WatchPlugin;
```

安装依赖：

```bash
npm install chokidar
```

### 2.5 自定义钩子

扩展 HookSystem 添加更多钩子。

```javascript
// core/HookSystem.js（增强版）
const { SyncHook, AsyncSeriesHook, SyncBailHook } = require('tapable');

class HookSystem {
  constructor() {
    this.hooks = {
      run: new SyncHook(),
      compile: new SyncHook(['compilation']),      // 新增
      afterCompile: new SyncHook(['compilation']), // 新增
      emit: new AsyncSeriesHook(['compilation']),  // 传递 compilation
      afterEmit: new SyncHook(['compilation']),    // 新增
      done: new SyncHook(['stats']),
      failed: new SyncHook(['error']),             // 新增
    };
  }
}
```

使用新钩子的插件：

```javascript
// plugins/AdvancedPlugin.js
class AdvancedPlugin {
  apply(compiler) {
    // 编译开始前
    compiler.hooks.compile.tap('AdvancedPlugin', (compilation) => {
      console.log('[AdvancedPlugin] 编译开始');
    });

    // 编译完成后
    compiler.hooks.afterCompile.tap('AdvancedPlugin', (compilation) => {
      console.log(`[AdvancedPlugin] 编译完成，共 ${compilation.modules.length} 个模块`);
    });

    // 构建失败时
    compiler.hooks.failed.tap('AdvancedPlugin', (error) => {
      console.error('[AdvancedPlugin] 构建失败:', error.message);
    });
  }
}
```

## 三、代码分割（Code Splitting）

实现基础的代码分割功能。

### 3.1 动态 import 支持

```javascript
// core/Parser.js（增强）
class Parser {
  parse(source, parentPath) {
    // ... 现有代码

    const dynamicImports = [];

    // 处理动态 import
    walk.simple(ast, {
      ImportExpression: (node) => {
        // import('./module.js')
        const importPath = node.source.value;
        const relId = toRelativeId(importPath);

        // 记录动态导入
        dynamicImports.push(relId);

        // 转换为异步加载
        const chunkId = dynamicImports.length - 1;
        ms.overwrite(
          node.start,
          node.end,
          `__tiny_pack_load_chunk__(${chunkId})`
        );
      }
    });

    return {
      transformedCode: ms.toString(),
      deps,
      dynamicImports
    };
  }
}
```

### 3.2 生成多个 Chunk

```javascript
// core/bundler.js（增强版）
function bundler(modules, entry, chunks = []) {
  // 主 bundle
  const mainBundle = generateMainBundle(modules, entry);

  // 动态 chunk
  const chunkBundles = chunks.map((chunk, i) => {
    return generateChunk(chunk, i);
  });

  return {
    main: mainBundle,
    chunks: chunkBundles
  };
}

function generateChunk(modules, chunkId) {
  const moduleEntries = modules.map(/* ... */);

  return `
    window.__tiny_pack_chunks__ = window.__tiny_pack_chunks__ || {};
    window.__tiny_pack_chunks__[${chunkId}] = [${moduleEntries}];
  `;
}

function generateMainBundle(modules, entry) {
  // 添加动态加载函数
  const runtime = `
    function __tiny_pack_load_chunk__(chunkId) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = \`./chunk.\${chunkId}.js\`;
        script.onload = () => {
          const chunk = window.__tiny_pack_chunks__[chunkId];
          resolve(chunk);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  `;

  return runtime + generateBundle(modules, entry);
}
```

## 四、Source Map 支持

添加 Source Map 以便调试。

### 4.1 生成 Source Map

```javascript
// core/Parser.js（使用 MagicString 的 Source Map 功能）
class Parser {
  parse(source, parentPath, filename) {
    const ms = new MagicString(source);

    // ... 转换代码

    return {
      transformedCode: ms.toString(),
      sourceMap: ms.generateMap({
        source: filename,
        includeContent: true,
        hires: true
      }),
      deps
    };
  }
}
```

### 4.2 在 Bundle 中引用 Source Map

```javascript
// core/bundler.js
function bundler(modules, entry, options = {}) {
  const bundleCode = generateBundle(modules, entry);

  if (options.sourceMap) {
    // 合并所有模块的 Source Map
    const sourceMap = combineSourceMaps(modules);

    return {
      code: bundleCode + `\n//# sourceMappingURL=bundle.js.map`,
      map: sourceMap
    };
  }

  return { code: bundleCode };
}
```

### 4.3 写入 Source Map

```javascript
// core/Compiler.js
run() {
  // ...

  const result = compilation.bundleCode;

  if (result.map) {
    // 写入 Source Map 文件
    const mapFile = outputFile + '.map';
    fs.writeFileSync(mapFile, JSON.stringify(result.map), 'utf-8');
  }

  fs.writeFileSync(outputFile, result.code, 'utf-8');
}
```

## 五、性能优化

### 5.1 并行构建

使用 Worker Threads 并行处理模块。

```javascript
// core/Compilation.js
const { Worker } = require('worker_threads');

class Compilation {
  async build() {
    const entryModule = await this.buildModule(this.config.entry);
    this.modules.push(entryModule);

    // 收集所有需要构建的模块
    const toBuild = [];
    for (const mod of this.modules) {
      for (const dep of mod.deps) {
        if (!this.modules.find(m => m.filename === dep)) {
          toBuild.push(path.resolve(process.cwd(), dep));
        }
      }
    }

    // 并行构建
    const workers = [];
    const maxWorkers = require('os').cpus().length;

    for (let i = 0; i < Math.min(toBuild.length, maxWorkers); i++) {
      workers.push(this.buildModuleInWorker(toBuild[i]));
    }

    const results = await Promise.all(workers);
    this.modules.push(...results);

    // ...
  }

  buildModuleInWorker(filename) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./workers/module-builder.js', {
        workerData: { filename }
      });

      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}
```

### 5.2 缓存机制

缓存已解析的模块。

```javascript
// core/Cache.js
const crypto = require('crypto');
const fs = require('fs');

class Cache {
  constructor(cacheDir = '.cache') {
    this.cacheDir = cacheDir;
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  }

  getKey(filename, source) {
    const hash = crypto.createHash('md5');
    hash.update(source);
    return `${filename}-${hash.digest('hex')}.json`;
  }

  get(filename, source) {
    const key = this.getKey(filename, source);
    const cachePath = path.join(this.cacheDir, key);

    if (fs.existsSync(cachePath)) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    }

    return null;
  }

  set(filename, source, data) {
    const key = this.getKey(filename, source);
    const cachePath = path.join(this.cacheDir, key);
    fs.writeFileSync(cachePath, JSON.stringify(data), 'utf-8');
  }
}

module.exports = Cache;
```

使用缓存：

```javascript
// core/Compilation.js
const Cache = require('./Cache');

class Compilation {
  constructor(config) {
    this.config = config;
    this.modules = [];
    this.cache = new Cache();
  }

  async buildModule(filename) {
    let source = fs.readFileSync(filename, 'utf-8');

    // 尝试从缓存读取
    const cached = this.cache.get(filename, source);
    if (cached) {
      console.log(`[Cache] 使用缓存: ${filename}`);
      return cached;
    }

    // ... 构建模块

    // 写入缓存
    this.cache.set(filename, source, module);

    return module;
  }
}
```

### 5.3 增量构建

只重新构建变化的文件。

```javascript
// core/Compiler.js
class Compiler {
  constructor(config) {
    this.config = config;
    this.hooks = new HookSystem().hooks;
    this.lastBuildTime = 0;
    this.fileTimestamps = new Map();
  }

  async run(incremental = false) {
    if (incremental) {
      // 检查文件变化
      const changed = this.getChangedFiles();
      if (changed.length === 0) {
        console.log('[Compiler] 没有文件变化，跳过构建');
        return;
      }
      console.log(`[Compiler] ${changed.length} 个文件已变化`);
    }

    // ... 正常构建流程
    this.lastBuildTime = Date.now();
  }

  getChangedFiles() {
    const changed = [];
    // 遍历所有已知文件
    for (const [file, lastTime] of this.fileTimestamps) {
      const stat = fs.statSync(file);
      if (stat.mtimeMs > lastTime) {
        changed.push(file);
        this.fileTimestamps.set(file, stat.mtimeMs);
      }
    }
    return changed;
  }
}
```

## 六、完整配置示例

整合所有高级特性的配置：

```javascript
// tinypack.config.js
const path = require('path');
const CleanPlugin = require('./plugins/CleanPlugin');
const BundleAnalyzerPlugin = require('./plugins/BundleAnalyzerPlugin');
const TerserPlugin = require('./plugins/TerserPlugin');
const WatchPlugin = require('./plugins/WatchPlugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      // Markdown
      {
        test: /\.md$/,
        use: [path.resolve(__dirname, 'loaders/markdown-loader.js')]
      },

      // CSS
      {
        test: /\.css$/,
        use: [path.resolve(__dirname, 'loaders/css-loader.js')]
      },

      // JSON
      {
        test: /\.json$/,
        use: [path.resolve(__dirname, 'loaders/json-loader.js')]
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          path.resolve(__dirname, 'loaders/css-loader.js'),
          path.resolve(__dirname, 'loaders/scss-loader.js')
        ]
      }
    ]
  },

  plugins: [
    new CleanPlugin(),
    new BundleAnalyzerPlugin(),
    new TerserPlugin({
      compress: {
        drop_console: true
      }
    }),
    process.env.WATCH && new WatchPlugin()
  ].filter(Boolean),

  // 性能优化选项
  cache: true,
  parallel: true,

  // Source Map
  sourceMap: process.env.NODE_ENV === 'development'
};
```

## 七、动手实验

### 实验 1：实现 TypeScript Loader

```javascript
// loaders/ts-loader.js
const ts = require('typescript');

module.exports = function tsLoader(source) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.CommonJS
    }
  });

  return result.outputText;
};
```

### 实验 2：实现环境变量替换插件

```javascript
// plugins/DefinePlugin.js
class DefinePlugin {
  constructor(definitions) {
    this.definitions = definitions;
  }

  apply(compiler) {
    compiler.hooks.compile.tap('DefinePlugin', (compilation) => {
      // 在每个模块中替换变量
      compilation.modules.forEach(mod => {
        Object.entries(this.definitions).forEach(([key, value]) => {
          const regex = new RegExp(`\\b${key}\\b`, 'g');
          mod.code = mod.code.replace(regex, JSON.stringify(value));
        });
      });
    });
  }
}
```

使用：

```javascript
plugins: [
  new DefinePlugin({
    'process.env.NODE_ENV': 'production',
    'API_URL': 'https://api.example.com'
  })
]
```

### 实验 3：实现 HTML 插件

```javascript
// plugins/HtmlPlugin.js
class HtmlPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('HtmlPlugin', () => {
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${this.options.title || 'TinyPack App'}</title>
</head>
<body>
  <div id="app"></div>
  <script src="${compiler.config.output.filename}"></script>
</body>
</html>
      `;

      const htmlPath = path.join(
        compiler.config.output.path,
        'index.html'
      );
      fs.writeFileSync(htmlPath, html.trim(), 'utf-8');
    });
  }
}
```

## 小结

本章介绍了 TinyPack 的高级特性：

- ✅ 复杂 Loader 的开发（CSS、Babel、TypeScript）
- ✅ 高级插件开发（清理、分析、压缩、监听）
- ✅ 代码分割的基本实现
- ✅ Source Map 支持
- ✅ 性能优化（并行、缓存、增量构建）

关键要点：

- Loader 和 Plugin 是扩展功能的核心
- 合理使用钩子系统
- 性能优化要权衡复杂度
- 参考 Webpack 的设计模式

## 下一步

遇到问题了吗？查看[故障排查指南](./troubleshooting.md)获取帮助！
