import React, { PureComponent } from "react";

// 模块化css, 将css写在一个文件中, 通过import引入, 然后通过对象的方式使用
// 优点：提高了代码的复用性，避免了全局污染，提高了代码的可维护性
// 缺点：增加了代码的复杂度，增加了学习成本
// 注意：模块化css只能在开发环境使用，生产环境需要使用插件将css提取出来
// class命名规范：模块名_类名
// 例如：app_name
// 通过import引入的模块名，会被转换成一个对象，对象的key就是模块名
// 例如：appStyle
// 通过对象的方式使用模块化css
// 例如：appStyle.name
// 注意：模块化css的类名，不能使用驼峰命名法
// 例如：appStyle.appName
// 注意：模块化css的类名，不能使用数字开头
// 例如：appStyle.app1Name
// 注意：模块化css的类名，不能使用连字符
// 例如：appStyle.app-name
import appStyle from "./App.module.css";

export class App extends PureComponent {
  render() {
    return <div className={appStyle.name}>App</div>;
  }
}

export default App;
