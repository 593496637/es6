import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import SvgIcon from '@/plugins/SvgIcon'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(SvgIcon)
app.mount('#app')
