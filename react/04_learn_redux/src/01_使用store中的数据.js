const store = require('./store')

// 订阅: 每次dispatch都会触发
const unsubscribe =store.subscribe(() => {
  console.log('订阅：', store.getState());
});

// 修改状态
store.dispatch({ type: "INCREMENT", count: 4 });

// 取消订阅: 取消订阅后，dispatch不会触发订阅
unsubscribe();

// 修改状态
store.dispatch({ type: "DECREMENT", count: 1 });