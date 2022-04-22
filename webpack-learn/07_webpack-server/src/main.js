// 不安装vue-loader的情况下，需要引入 /dist/vue.esm-bundler
import { createApp } from 'vue';
import { sum } from './js/math';
const { priceFormat } = require('./js/format');
// 模块热替换：第一需要引入
import './js/element'
import App from './vue/App.vue';

// 模块热替换：需要监听热替换的模块
if (module.hot) {
  module.hot.accept('./js/element.js', () => {
    console.log('element 模块更新成功');
  });
}

console.log(sum(1, 2));
console.log(priceFormat());





const app = createApp(App)
app.mount('#app');