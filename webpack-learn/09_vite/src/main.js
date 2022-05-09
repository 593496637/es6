import { createApp } from 'vue'
import _ from 'lodash-es';
import { math } from './js/math'
import mul from './ts/mul'
import './css/style.css'
import './css/style.less'
import App from './vue/app.vue'


console.log(math(1, 2));
console.log(_.join(['a', 'b', 'c'], '~'));

console.log(mul(2, 3));


const titleEL = document.createElement('div')
titleEL.className = 'title'
titleEL.innerHTML = 'hello vite'
document.body.appendChild(titleEL)


createApp(App).mount('#app')