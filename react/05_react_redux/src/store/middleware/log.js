// 中间件原理
// log中间件：每次dispatch action时，都会打印出当前的state
const logger = (store) => {
  const next = store.dispatch;
  function dispatchAndLog(action) {
    console.log('当前派发的action', action);
    next(action);
    console.log('派发之后的结果', store.getState());
  }

  // monkey patching: 猴子补丁，修改store.dispatch方法，对整体流程进行拦截
  store.dispatch = dispatchAndLog;
};

export default logger;
