const store = require('./store')
const { increment, decrement } = require('./store/actionCreators')

// 订阅: 每次dispatch都会触发
const unsubscribe = store.subscribe(() => {
  console.log('订阅：', store.getState());
});

// 修改状态
store.dispatch(increment(4));

// 修改状态
store.dispatch(decrement(1));

// 取消订阅: 取消订阅后，dispatch不会触发订阅
unsubscribe();