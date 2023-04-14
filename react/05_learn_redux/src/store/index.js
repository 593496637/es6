import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './counter';
import homeReducer from './home'

// 开发环境下使用 redux-devtools-extension
// trace: true 会在控制台打印出 action 的来源
// composeEnhancers 用于合并多个中间件
// compose 用于合并多个 store enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer
})


// combineReducers原理：本质上是一个函数，接收一个对象作为参数，返回一个函数，这个函数接收一个state和一个action作为参数，返回一个新的state
// const reducer = (state = {}, action) => {
//   return {
//     counter: counterReducer(state.counter, action),
//     home: homeReducer(state.home, action)
//   }
// }


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;