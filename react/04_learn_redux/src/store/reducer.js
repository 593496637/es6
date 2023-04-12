const { INCREMENT, DECREMENT } = require("./actionTypes");

// 初始化状态: state是一个对象，里面可以有多个属性
const initialState = {
  name: "zhangsan",
  count: 0
};

// reducer：接收旧的state和action，返回新的state
// reducer是一个纯函数，接收旧的state和action，返回新的state
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT: // 增加
      return {
        ...state,
        count: state.count + action.count
      };
    case DECREMENT: // 减少
      return {
        ...state,
        count: state.count - action.count
      };
    default:
      return state;
  }
}

module.exports = reducer;