# Rollup 学习

## 提供一个充分利用 ESM 打包器

## 运行打包器

`pnpm rollup --config rollup.config.js`

### 插件

- 导入 json：**rollup-plugin-json**
- 正确解析和处理 Node.js 中的模块(默认只支持esmodule模块): **rollup-plugin-node-resolve**
- 加载commonJS模块：**rollup-plugin-commonjs**