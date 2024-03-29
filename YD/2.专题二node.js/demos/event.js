// 引入event模块并创建eventEmitter对象
const events = require('events')
const eventEmitter = new events.EventEmitter()

// 绑定事件处理函数
const connectHandler = function connected() {
  console.log('connected被调用');
}

eventEmitter.on('connection', connectHandler)

// 触发事件
eventEmitter.emit()

console.log('程序执行完毕');