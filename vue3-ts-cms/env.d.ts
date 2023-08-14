/// <reference types="vite/client" />

// 作用：解决ts中引入vue文件报错的问题
// 问题原因：ts默认不支持导入vue文件，需要声明一下
// 可以不用声明，但是必须安装volar插件，否则会报错
// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent
//   export default component
// }
