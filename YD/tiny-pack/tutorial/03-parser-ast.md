# 第三章：Parser 与 AST 转换详解

> 深入 AST 的世界，理解代码转换的本质

## 什么是 AST？

AST（Abstract Syntax Tree，抽象语法树）是代码的树形表示。编译器通过 AST 理解和转换代码。

### 简单示例

```javascript
const a = 1;
```

对应的 AST（简化版）：

```json
{
  "type": "VariableDeclaration",
  "kind": "const",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": { "type": "Identifier", "name": "a" },
      "init": { "type": "Literal", "value": 1 }
    }
  ]
}
```

### 可视化工具

访问 [AST Explorer](https://astexplorer.net/)，输入代码即可看到对应的 AST 结构。

选择 **acorn** 解析器（TinyPack 使用的解析器）：

```javascript
import message from './data.js';

// 对应的 AST 节点
{
  "type": "ImportDeclaration",
  "specifiers": [
    {
      "type": "ImportDefaultSpecifier",
      "local": { "type": "Identifier", "name": "message" }
    }
  ],
  "source": {
    "type": "Literal",
    "value": "./data.js"
  }
}
```

## Parser 的核心流程

```
源代码
   │
   ▼
┌──────────────┐
│ acorn.parse  │  解析成 AST
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ acorn-walk   │  遍历 AST 节点
└──────┬───────┘
       │
       ├──> ImportDeclaration → 转换为 require
       ├──> ExportDefaultDeclaration → 转换为 exports.default
       └──> ExportNamedDeclaration → 转换为 exports.xxx
       │
       ▼
┌──────────────┐
│ MagicString  │  生成转换后的代码
└──────┬───────┘
       │
       ▼
转换后的代码 + 依赖列表
```

## 核心实现解析

### 1. 初始化

```javascript
// core/Parser.js
class Parser {
  parse(source, parentPath) {
    // 📖 解析源码为 AST
    const ast = acorn.parse(source, {
      ecmaVersion: 'latest',    // 支持最新 ES 语法
      sourceType: 'module',     // 解析为 ES Module
      allowHashBang: true,      // 允许 shebang（#!/usr/bin/env node）
    });

    // 🔧 创建 MagicString 实例（用于代码改写）
    const ms = new MagicString(source);

    // 📦 存储依赖路径
    const deps = [];

    // 🔢 生成唯一变量名的计数器
    let importIndex = 0;
    let exportIndex = 0;

    // ... 转换逻辑
  }
}
```

### 2. 路径规范化

```javascript
// 将相对路径转换为项目内的统一标识
const toRelativeId = (importPath) => {
  // 1. 解析为绝对路径
  const absPath = path.resolve(parentPath, importPath);

  // 2. 转换为相对于项目根目录的路径
  const relPath = path.relative(process.cwd(), absPath);

  // 3. 统一使用 '/' 分隔符（兼容 Windows）
  return './' + relPath.replace(/\\/g, '/');
};
```

示例：

```javascript
// 当前文件：D:\project\es6\YD\tiny-pack\examples\src\index.js
// 导入路径：'./data.js'

// 执行过程：
absPath = resolve('D:\project\es6\YD\tiny-pack\examples\src', './data.js')
        = 'D:\project\es6\YD\tiny-pack\examples\src\data.js'

relPath = relative('D:\project\es6\YD\tiny-pack', absPath)
        = 'examples\src\data.js'

relId = './' + 'examples/src/data.js'
      = './examples/src/data.js'
```

### 3. Import 语句转换

#### 3.1 Import 类型

ES6 Module 支持三种 import 语法：

```javascript
// 1. 默认导入
import message from './data.js';

// 2. 命名导入
import { name, age } from './user.js';

// 3. 命名空间导入
import * as utils from './utils.js';

// 4. 副作用导入
import './polyfill.js';
```

#### 3.2 转换策略

```javascript
const handleImport = (node) => {
  // 🎯 规范化路径并收集依赖
  const relId = toRelativeId(node.source.value);
  deps.push(relId);

  // 📌 情况 1: 副作用导入（无 specifiers）
  if (!node.specifiers.length) {
    ms.overwrite(node.start, node.end, `require('${relId}');`);
    return;
  }

  // 生成唯一的临时变量名
  const tempVar = `__tiny_pack_import_${importIndex++}`;
  const statements = [`const ${tempVar} = require('${relId}');`];

  // 📌 情况 2: 处理各种 specifier
  node.specifiers.forEach((spec) => {
    if (spec.type === 'ImportDefaultSpecifier') {
      // 默认导入：import foo from './bar'
      statements.push(
        `const ${spec.local.name} = ${tempVar} && ${tempVar}.__esModule ` +
        `? ${tempVar}.default : ${tempVar};`
      );
    } else if (spec.type === 'ImportNamespaceSpecifier') {
      // 命名空间导入：import * as foo from './bar'
      statements.push(`const ${spec.local.name} = ${tempVar};`);
    }
  });

  // 📌 情况 3: 命名导入（单独处理以支持解构）
  const namedSpecs = node.specifiers.filter(
    (spec) => spec.type === 'ImportSpecifier'
  );
  if (namedSpecs.length) {
    const parts = namedSpecs.map((spec) =>
      spec.imported.name === spec.local.name
        ? spec.local.name  // import { foo } from './bar'
        : `${spec.imported.name}: ${spec.local.name}`  // import { foo as bar }
    );
    statements.push(`const { ${parts.join(', ')} } = ${tempVar};`);
  }

  // 🔄 替换原代码
  ms.overwrite(node.start, node.end, statements.join('\n'));
};
```

#### 3.3 转换示例

**示例 1: 默认导入**

```javascript
// 原始代码
import message from './data.js';

// AST 节点
{
  type: 'ImportDeclaration',
  specifiers: [
    { type: 'ImportDefaultSpecifier', local: { name: 'message' } }
  ],
  source: { value: './data.js' }
}

// 转换后
const __tiny_pack_import_0 = require('./examples/src/data.js');
const message = __tiny_pack_import_0 && __tiny_pack_import_0.__esModule
  ? __tiny_pack_import_0.default
  : __tiny_pack_import_0;
```

为什么需要 `__esModule` 判断？

```javascript
// ES6 Module
export default 'value';
// → exports.default = 'value'; exports.__esModule = true;

// CommonJS Module
module.exports = 'value';
// → 直接返回 'value'

// 导入时需要区分
const message = module.__esModule ? module.default : module;
```

**示例 2: 命名导入**

```javascript
// 原始代码
import { name, age as userAge } from './user.js';

// 转换后
const __tiny_pack_import_0 = require('./examples/src/user.js');
const { name, age: userAge } = __tiny_pack_import_0;
```

**示例 3: 混合导入**

```javascript
// 原始代码
import React, { useState, useEffect } from 'react';

// 转换后
const __tiny_pack_import_0 = require('react');
const React = __tiny_pack_import_0 && __tiny_pack_import_0.__esModule
  ? __tiny_pack_import_0.default
  : __tiny_pack_import_0;
const { useState, useEffect } = __tiny_pack_import_0;
```

**示例 4: 命名空间导入**

```javascript
// 原始代码
import * as utils from './utils.js';

// 转换后
const __tiny_pack_import_0 = require('./examples/src/utils.js');
const utils = __tiny_pack_import_0;
```

### 4. Export 语句转换

#### 4.1 Export Default

```javascript
const handleExportDefault = (node) => {
  const decl = node.declaration;

  // 📌 情况 1: 导出函数或类声明
  if (decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') {
    if (decl.id && decl.id.name) {
      // export default function foo() {}
      const code = source.slice(decl.start, decl.end);
      ms.overwrite(
        node.start,
        node.end,
        `${code}\nexports.default = ${decl.id.name};\nexports.__esModule = true;`
      );
    } else {
      // export default function() {}  (匿名)
      const temp = `__tiny_pack_default_${exportIndex++}`;
      const code = source.slice(decl.start, decl.end);
      ms.overwrite(
        node.start,
        node.end,
        `const ${temp} = ${code};\nexports.default = ${temp};\nexports.__esModule = true;`
      );
    }
    return;
  }

  // 📌 情况 2: 导出表达式
  // export default 'value'
  const expressionCode = source.slice(decl.start, decl.end);
  ms.overwrite(
    node.start,
    node.end,
    `exports.default = ${expressionCode};\nexports.__esModule = true;`
  );
};
```

转换示例：

```javascript
// 1. 具名函数
export default function greet() { return 'Hi'; }
// →
function greet() { return 'Hi'; }
exports.default = greet;
exports.__esModule = true;

// 2. 匿名函数
export default function() { return 'Hi'; }
// →
const __tiny_pack_default_0 = function() { return 'Hi'; };
exports.default = __tiny_pack_default_0;
exports.__esModule = true;

// 3. 表达式
export default 'Hello';
// →
exports.default = 'Hello';
exports.__esModule = true;

// 4. 对象
export default { name: 'TinyPack' };
// →
exports.default = { name: 'TinyPack' };
exports.__esModule = true;
```

#### 4.2 Export Named

```javascript
const handleExportNamed = (node) => {
  // 🚫 不支持 re-export
  if (node.source) {
    throw new Error(
      'Re-export syntax (export ... from ...) is not supported in TinyPack.'
    );
  }

  // 📌 情况 1: 导出声明
  if (node.declaration) {
    // export const name = 'foo';
    const declCode = source.slice(node.declaration.start, node.declaration.end);
    const names = collectDeclaredNames(node.declaration);
    const exportLines = names.map((name) => `exports.${name} = ${name};`);
    ms.overwrite(
      node.start,
      node.end,
      `${declCode}\n${exportLines.join('\n')}`
    );
    return;
  }

  // 📌 情况 2: 导出列表
  // export { foo, bar as baz };
  const exportLines = node.specifiers.map((spec) => {
    const local = spec.local.name;
    const exported = spec.exported.name;
    return `exports.${exported} = ${local};`;
  });
  ms.overwrite(node.start, node.end, exportLines.join('\n'));
};
```

辅助函数：提取声明的变量名

```javascript
const collectDeclaredNames = (declaration) => {
  const names = [];

  switch (declaration.type) {
    case 'VariableDeclaration':
      // export const a = 1, b = 2;
      declaration.declarations.forEach((decl) => {
        extractNamesFromPattern(decl.id, names);
      });
      break;

    case 'FunctionDeclaration':
    case 'ClassDeclaration':
      // export function foo() {} / export class Bar {}
      if (declaration.id) {
        names.push(declaration.id.name);
      }
      break;
  }

  return names;
};

// 处理解构模式
const extractNamesFromPattern = (node, names) => {
  switch (node.type) {
    case 'Identifier':
      names.push(node.name);
      break;

    case 'ArrayPattern':
      // const [a, b] = arr;
      node.elements.forEach((element) => {
        if (element) extractNamesFromPattern(element, names);
      });
      break;

    case 'ObjectPattern':
      // const { a, b: c } = obj;
      node.properties.forEach((prop) => {
        if (prop.type === 'RestElement') {
          extractNamesFromPattern(prop.argument, names);
        } else {
          extractNamesFromPattern(prop.value, names);
        }
      });
      break;

    case 'RestElement':
      // const [...rest] = arr;
      extractNamesFromPattern(node.argument, names);
      break;

    case 'AssignmentPattern':
      // const { a = 1 } = obj;
      extractNamesFromPattern(node.left, names);
      break;
  }
};
```

转换示例：

```javascript
// 1. 简单变量
export const name = 'TinyPack';
// →
const name = 'TinyPack';
exports.name = name;

// 2. 多个变量
export const a = 1, b = 2;
// →
const a = 1, b = 2;
exports.a = a;
exports.b = b;

// 3. 函数
export function greet() { return 'Hi'; }
// →
function greet() { return 'Hi'; }
exports.greet = greet;

// 4. 导出列表
const foo = 1;
const bar = 2;
export { foo, bar as baz };
// →
const foo = 1;
const bar = 2;
exports.foo = foo;
exports.baz = bar;

// 5. 解构声明
export const { x, y } = point;
// →
const { x, y } = point;
exports.x = x;
exports.y = y;
```

### 5. MagicString 的使用

MagicString 是一个高效的字符串操作库，支持：

- **非破坏性修改**：不影响原始字符串
- **Source Map 支持**：可以生成映射文件
- **高性能**：比字符串拼接快得多

#### 5.1 基本用法

```javascript
const MagicString = require('magic-string');

const code = 'const a = 1;';
const ms = new MagicString(code);

// 替换指定范围
ms.overwrite(6, 7, 'b');  // const b = 1;

// 在指定位置插入
ms.appendLeft(12, ' // 注释');  // const b = 1; // 注释

// 生成最终代码
const result = ms.toString();
```

#### 5.2 在 Parser 中的应用

```javascript
// 假设原始代码
const source = "import foo from './bar.js';\nconsole.log(foo);";
const ms = new MagicString(source);

// AST 节点信息
// ImportDeclaration: { start: 0, end: 27 }

// 替换 import 语句
ms.overwrite(0, 27, "const foo = require('./bar.js');");

// 生成转换后的代码
const transformedCode = ms.toString();
// "const foo = require('./bar.js');\nconsole.log(foo);"
```

#### 5.3 为什么用 MagicString？

与字符串拼接对比：

```javascript
// ❌ 字符串拼接（低效）
let result = '';
let lastIndex = 0;

nodes.forEach(node => {
  result += source.slice(lastIndex, node.start);
  result += transformNode(node);
  lastIndex = node.end;
});
result += source.slice(lastIndex);

// ✅ MagicString（高效）
const ms = new MagicString(source);
nodes.forEach(node => {
  ms.overwrite(node.start, node.end, transformNode(node));
});
const result = ms.toString();
```

MagicString 的优势：

- 内部使用链表结构，修改操作 O(1)
- 自动处理位置偏移
- 支持 Source Map 生成

### 6. 完整转换流程

```javascript
walk.simple(ast, {
  ImportDeclaration: handleImport,
  ExportDefaultDeclaration: handleExportDefault,
  ExportNamedDeclaration: handleExportNamed,
});

return {
  transformedCode: ms.toString(),
  deps
};
```

## 完整示例

### 输入

```javascript
// src/index.js
import message, { version } from './data.js';
import * as utils from './utils.js';

console.log(message);
console.log(version);
console.log(utils.format('TinyPack'));

export default 'App';
export const author = 'Claude';
```

```javascript
// src/data.js
export default 'Hello from TinyPack';
export const version = '1.0.0';
```

```javascript
// src/utils.js
export function format(str) {
  return `[${str}]`;
}
```

### 转换后

```javascript
// index.js (转换后)
const __tiny_pack_import_0 = require('./examples/src/data.js');
const message = __tiny_pack_import_0 && __tiny_pack_import_0.__esModule
  ? __tiny_pack_import_0.default
  : __tiny_pack_import_0;
const { version } = __tiny_pack_import_0;

const __tiny_pack_import_1 = require('./examples/src/utils.js');
const utils = __tiny_pack_import_1;

console.log(message);
console.log(version);
console.log(utils.format('TinyPack'));

exports.default = 'App';
exports.__esModule = true;

const author = 'Claude';
exports.author = author;
```

```javascript
// data.js (转换后)
exports.default = 'Hello from TinyPack';
exports.__esModule = true;

const version = '1.0.0';
exports.version = version;
```

```javascript
// utils.js (转换后)
function format(str) {
  return `[${str}]`;
}
exports.format = format;
```

### 依赖列表

```javascript
deps = [
  './examples/src/data.js',
  './examples/src/utils.js'
]
```

## 动手实验

### 实验 1：打印 AST

在 Parser 中添加日志：

```javascript
parse(source, parentPath) {
  const ast = acorn.parse(source, {...});
  console.log(JSON.stringify(ast, null, 2));
  // ...
}
```

观察不同代码的 AST 结构。

### 实验 2：支持动态 import

```javascript
// 原始代码
const mod = await import('./dynamic.js');

// 转换目标
const mod = await Promise.resolve(require('./dynamic.js'));
```

提示：需要处理 `ImportExpression` 节点。

### 实验 3：支持 export * from

```javascript
// 原始代码
export * from './module.js';

// 转换目标
const __tiny_pack_reexport_0 = require('./module.js');
Object.keys(__tiny_pack_reexport_0).forEach(key => {
  if (key !== 'default' && key !== '__esModule') {
    exports[key] = __tiny_pack_reexport_0[key];
  }
});
```

### 实验 4：添加转换日志

```javascript
const handleImport = (node) => {
  console.log(`🔍 转换 import: ${node.source.value}`);
  console.log(`   类型: ${node.specifiers.map(s => s.type).join(', ')}`);
  // ...
};
```

### 实验 5：使用 AST Explorer

1. 访问 https://astexplorer.net/
2. 选择 **acorn** 解析器
3. 输入各种 import/export 语句
4. 观察 AST 节点结构
5. 理解 TinyPack 的转换逻辑

## 常见陷阱

### 陷阱 1：位置计算错误

```javascript
// ❌ 错误：使用字符串长度
ms.overwrite(0, 'import'.length, 'const');

// ✅ 正确：使用 AST 节点的位置
ms.overwrite(node.start, node.end, transformedCode);
```

### 陷阱 2：忘记处理边界情况

```javascript
// 代码
import './side-effect.js';

// 如果不检查 specifiers.length
// 会生成错误的代码：const __tiny_pack_import_0 = require(...)
```

### 陷阱 3：路径分隔符问题

```javascript
// ❌ Windows 路径
'examples\\src\\index.js'

// ✅ 统一使用 '/'
'examples/src/index.js'

// 解决方案
.replace(/\\/g, '/')
```

### 陷阱 4：循环依赖

```javascript
// a.js
import { b } from './b.js';
export const a = 1;

// b.js
import { a } from './a.js';
export const b = 2;
```

解决：在 Compilation 中检测重复模块。

## 性能优化

### 优化 1：缓存 AST

```javascript
const astCache = new Map();

parse(source, parentPath) {
  const cacheKey = source;
  if (astCache.has(cacheKey)) {
    // 使用缓存的 AST
  } else {
    const ast = acorn.parse(source, {...});
    astCache.set(cacheKey, ast);
  }
}
```

### 优化 2：并行解析

```javascript
async buildModules(files) {
  const promises = files.map(file => this.buildModule(file));
  return await Promise.all(promises);
}
```

### 优化 3：增量编译

只重新解析修改过的文件：

```javascript
const fileHashes = new Map();

async buildModule(filename) {
  const hash = getFileHash(filename);
  if (fileHashes.get(filename) === hash) {
    return cache.get(filename);
  }
  // ...
}
```

## 小结

本章深入探讨了 AST 转换的核心机制：

- ✅ 理解 AST 的结构和表示
- ✅ 掌握 import/export 的转换规则
- ✅ 学会使用 MagicString 进行代码改写
- ✅ 了解边界情况和性能优化

关键要点：

- AST 是代码转换的基础
- 不同的 import/export 语法需要不同的处理
- MagicString 提供高效的字符串操作
- 路径规范化确保模块正确解析

## 下一步

准备探索更多高级特性了吗？让我们进入[第四章：高级特性实现](./04-advanced-features.md)！
