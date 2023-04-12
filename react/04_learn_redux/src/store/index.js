const { createStore } = require("redux");
const reducer = require("./reducer");

// 创建store: 传入reducer
const store = createStore(reducer);

// 订阅: 每次dispatch都会触发
// store.subscribe(() => {
//   console.log('----', store.getState());
// });

module.exports = store;