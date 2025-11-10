# 04｜Loader & Plugin：沿途的工具箱

到这一章，我们让 TinyPack 具备“处理异构资源”和“对外开放扩展点”的能力。Loader 像是沿途的工具箱，负责把 Markdown、样式等内容转换成 JS；Plugin 则像随行顾问，通过 Hook 在关键节点执行额外逻辑。

## Loader：逐步加工源码
### 运行机制
1. `Compilation.buildModule` 根据 `module.rules` 匹配文件。
2. `LoaderRunner` 把 `rule.use` 统一成数组，并 **倒序** 执行，遵循 Webpack 的“后写先执行”惯例。
3. 每个 loader 接收 `source`，返回新的源码字符串；支持同步或 Promise。

```js
for (let i = this.loaders.length - 1; i >= 0; i--) {
  const loader = require(path.resolve(this.loaders[i]));
  code = await Promise.resolve(loader(code));
}
```

### Markdown 示例
```js
const { marked } = require('marked');
module.exports = function markdownLoader(source) {
  const html = marked.parse(source);
  return `module.exports = ${JSON.stringify(html)};`;
};
```
这样 `.md` 文件就会在 bundle 中变成可直接 `require` 的 HTML 字符串。

## Plugin：接入生命周期
### HookSystem 回顾
- `run`：同步 hook，构建启动时触发。
- `emit`：异步串行 hook，写入产物前触发。
- `done`：同步 hook，流程完成时触发。

### 编写插件
```js
class ConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('ConsoleLogPlugin', () => console.log('[plugin] 构建开始'));
    compiler.hooks.emit.tapPromise('ConsoleLogPlugin', async () => console.log('[plugin] 生成产物'));
    compiler.hooks.done.tap('ConsoleLogPlugin', () => console.log('[plugin] 完成'));
  }
}
```
插件通过 `compiler.hooks.xxx.tap()` 或 `tapPromise()` 注册逻辑，与 Webpack 插件模式保持一致，方便迁移思维。

## 验证方式
1. 修改 `examples/tinypack.config.js`，让 `.md` 文件走 markdown-loader。
2. 运行 `node bin/tinypack.js`：观察终端是否出现插件日志，`dist/bundle.js` 是否包含 HTML 字符串。
3. `node dist/bundle.js`：确认运行产物时能输出 Markdown 渲染结果。

## 延伸思路
- **Loader API**：可以进一步实现 `this.async()`、`pitch` 等接口，兼容更多生态中的 loader。
- **Hook 扩展**：增加 `beforeRun`、`afterCompile` 之类的阶段，支持复杂插件。
- **Source Map**：利用 `magic-string` 生成 map，提升调试体验。

到这里，TinyPack 已具备一个现代打包器的基本形态：清晰的生命周期、依赖图构建、bundle 生成、loader 处理和插件扩展。接下来可以根据项目需求继续增加新能力。*** End Patch
