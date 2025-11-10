# 03｜Bundler：把路线图折叠成行李箱

现在所有模块都排好了队，接下来要把它们压缩成一个 bundle。可以把 bundler 想象成行李打包员：它把每节车厢都折叠成 `[function, mapping]` 的紧凑形态，并塞进一个自执行的行李箱里，随时可以打开运行。

## 需要完成的能力
1. **编号每个模块**：为 `filename` 分配整数 id，方便依赖映射。
2. **生成模块表**：每个模块记录 `function + mapping`。
3. **编写 runtime**：实现一个迷你 `require`，复原模块之间的引用。

## 实现要点
### 1. 建立索引
```js
const moduleIds = {};
modules.forEach((mod, i) => {
  moduleIds[mod.filename] = i;
});
```
这样依赖映射就能通过 `mapping[dep] = moduleIds[dep]` 快速定位。

### 2. 拼接模块条目
```js
const moduleEntries = modules
  .map((mod) => {
    const mapping = {};
    mod.deps.forEach((dep) => (mapping[dep] = moduleIds[dep]));
    return `[function(require, module, exports){${mod.code}}, ${JSON.stringify(mapping)}]`;
  })
  .join(',');
```
- **注意**：不要对整个模块对象做 `JSON.stringify`，否则函数体会变成字符串，运行时拿到的就不再是可执行函数。

### 3. runtime 模板
```js
const result = `
  (function(modules){
    function require(id){
      const [fn, mapping] = modules[id];
      function localRequire(relPath){ return require(mapping[relPath]); }
      const module = { exports: {} };
      fn(localRequire, module, module.exports);
      return module.exports;
    }
    require(${entryId});
  })([${moduleEntries}])
`;
```
- `modules` 是一个数组，元素是 `[fn, mapping]`。
- `localRequire` 通过 `mapping` 把相对路径转换成真实的模块 id。
- `module.exports` 遵循 CommonJS 约定，方便 loader 直接输出 `module.exports = ...`。

### 4. 入口 id
```js
const entryId = moduleIds[entry] ?? 0;
```
允许指定特定入口；缺省时从数组第一个模块开始。

## 验证方式
1. `node bin/tinypack.js`：重新生成 bundle。
2. `node dist/bundle.js`：直接运行产物，应能输出示例中的 Markdown/日志。如果出现 `fn is not a function` 或 `Unexpected token export`，检查模块条目和 Parser 转换是否正确。
