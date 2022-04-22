// 不安装vue-loader的情况下，需要引入 /dist/vue.esm-bundler
import { createApp } from 'vue';
import { sum } from './js/math';
const { priceFormat } = require('./js/format');
import './js/element'
import App from './vue/App.vue';


console.log(sum(1, 2));
console.log(priceFormat());

// 方式一
// const app = createApp({
//   template:`#my-app`,
//   data() {
//     return {
//       msg: 'hello world'
//     }
//   }
// })

// 方式二
const app = createApp(App)
app.mount('#app');