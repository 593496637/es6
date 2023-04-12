const { INCREMENT, DECREMENT } = require("./actionTypes");

// actionCreator: 用来生成action的函数
function increment(count) {
  return {
    type: INCREMENT,
    count
  }
}

function decrement(count) {
  return {
    type: DECREMENT,
    count
  }
}

module.exports = {
  increment,
  decrement
}