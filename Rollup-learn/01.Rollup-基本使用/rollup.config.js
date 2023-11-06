// 加载json文件插件
import json from 'rollup-plugin-json'
// 加载npm包插件（esmodule包）
import resolve from 'rollup-plugin-node-resolve'
// 加载npm包插件（commonjs包）
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json(),
    resolve(),
    commonjs()
  ]
}