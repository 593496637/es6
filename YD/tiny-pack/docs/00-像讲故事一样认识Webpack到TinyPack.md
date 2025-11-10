# 0️⃣｜从 Webpack 视角看 TinyPack

Webpack 像一家成熟的旅行社：它负责规划线路（依赖图）、安排车次（模块执行顺序）、准备行李箱（bundle），还能借助 loader/plugin 这些合作伙伴解决沿途的各种问题。TinyPack 则是我们亲手搭建的小型专车，体量更轻，却保留了最核心的行程安排逻辑。

## Webpack 做了哪些关键事情？
- **统一入口**：从配置的 `entry` 出发，根据 `import/require` 图谱把所有资源都纳入行程。
- **转换能力（loader）**：把 TypeScript、CSS、Markdown 等“不同语言的游客”翻译成 JS，让它们能一起上车。
- **扩展能力（plugin）**：通过生命周期 hook（`run`、`emit`、`done` 等）插入额外交互，例如打印日志、写入新产物。
- **输出 bundle**：最终产物通常是 `(function(modules){ ... })([...] )` 这样的自执行函数，浏览器或 Node 拿到就能运行。

## 为什么还要自己实现 TinyPack？
1. **吃透原理**：只有自己搭过一遍，Webpack 配置里的“魔法”才会具象化。
2. **最小可用**：演示、教学、实验时往往只需核心功能，TinyPack 更易读、易改。
3. **可控扩展**：掌握结构后，可以按需增减特性而不被大型工具束缚。

## TinyPack 的核心角色（类比旅程，让概念更直观）
- **CLI + Compiler**：调度中心。CLI 负责读取配置并启动构建；Compiler 则像车站广播，按顺序触发 `run → emit → done`，让其他系统有机会插手。
- **Compilation**：路线规划员。它从入口文件出发，调用 `buildModule` 不断发现新的依赖，并把每个模块标准化为 `{ filename, code, deps }`，也就是 TinyPack 的路网数据。
- **Parser**：翻译官。借助 `acorn` 解析 AST，再用 `magic-string` 改写源码，把 `import/export` 转成 CommonJS 的 `require/exports`，同时记录依赖路径，保证 runtime 能看懂。
- **Bundler Runtime**：行程打包器。它把模块折叠成 `[function, mapping]` 条目，加上一个迷你 `require` 实现，一次性塞进 `(function(modules){ ... })([ ... ])` 这个“行李箱”里。
- **Loader & Plugin**：沿途的工具箱与协作伙伴。Loader 按链式顺序处理源码（例如 markdown-loader 使用 `marked` 输出 HTML 字符串）；Plugin 借助 `tapable` 的 hook 在关键节点执行自定义逻辑。

明确了这些角色，后续章节会逐个实现它们。最终你会发现，TinyPack 既是对 Webpack 思路的浓缩，也是理解复杂打包工具的捷径。

