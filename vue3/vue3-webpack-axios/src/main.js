import { createApp } from 'vue'
import App from './App.vue'
import { instance1, instance2 } from './service'

createApp(App).mount('#app')


// http://123.207.32.32:9002/lyric?id=500665346

// instance1
instance1.request({
  url: '/lyric?id=500665346',
  method: 'get'
}).then(function (res) {
  console.log('res:', res.data);
})

// instance1
instance1.get({
  url: '/lyric',
  params: {
    id: '500665346',
  }
}).then(function (res) {
  console.log('res:', res.data);
})

// instance2
instance2.get({
  url: '/lyric',
  params: {
    id: '500665346',
  }
}).then(function (res) {
  console.log('res:', res.data);
})
