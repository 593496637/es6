import { createApp } from 'vue'
// import App from './01_自定义指令/01_自定义指令的基本使用.vue'
// import App from './01_自定义指令/02_自定义指令生命周期.vue'
// import App from './01_自定义指令/03_自定义指令的值.vue'
// import App from './01_自定义指令/04_自定义指令格式化日期.vue'
// import App from './01_自定义指令/05_自定义指令参数与修饰符.vue'
// import App from './02_内置组件/01_teleport使用.vue'
// import App from './02_内置组件/02_suspense使用.vue'

// import App from './03_安装插件/App.vue'

// import App from './04_Render函数/01_render函数的基本使用.vue'
// import App from './04_Render函数/02_render函数计数器实现.vue'
// import App from './04_Render函数/04_setup语法糖.vue'

import App from './05_JSX/App.vue'


import directives from './01_自定义指令/directives'

import MyPlugin from './03_安装插件/my-plugin'

// 方式一：调用自定义指令，使用函数的方式
// const app = createApp(App)
// directives(app)
// app.mount('#app')


// 方式二：全局注册自定义指令，使用插件的方式
createApp(App).use(directives).use(MyPlugin).mount('#app')

