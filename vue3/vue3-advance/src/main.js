import { createApp } from 'vue'
// import App from './01_自定义指令/01_自定义指令的基本使用.vue'
// import App from './01_自定义指令/02_自定义指令生命周期.vue'
// import App from './01_自定义指令/03_自定义指令的值.vue
// import App from './01_自定义指令/04_自定义指令格式化日期.vue'
import App from './01_自定义指令/05_自定义指令参数与修饰符.vue'

import useDirectives from './01_自定义指令/directives'

const app = createApp(App)

useDirectives(app)

app.mount('#app')
