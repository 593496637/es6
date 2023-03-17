import MyComponent from './MyComponent.vue';

// 方式一：使用install方法
// my-plugin.js
// export default {
//   install(app, options) {
//     // 添加全局指令
//     app.directive('my-directive', {
//       mounted(el, binding, vnode, oldVnode) {
//         // 指令逻辑
//       },
//     });

//     // 添加全局组件
//     app.component('my-component', {
//       /* 组件选项 */
//     });

//     // 添加原型属性
//     app.config.globalProperties.$myProperty = 'This is a custom property';
//   },
// };


// 方式二：使用函数
// my-plugin.js
export default function (app, options) {
  // 添加全局指令
  app.directive('my-directive', {
    mounted(el, binding, vnode, oldVnode) {
      // 指令逻辑
      console.log('my-directive mounted');
    },
  });

  // 添加全局组件
  app.component('MyComponent', MyComponent);

  // 添加原型属性
  app.config.globalProperties.$myProperty = 'This is a custom property';
};
