// 去掉了applyMiddleware，因为使用的是自定义中间件
import { createStore, compose, combineReducers } from 'redux';
// import { thunk } from 'redux-thunk';
import counterReducer from './counter';
import homeReducer from './home';
import userReducer from './user';
import { logger, thunk, applyMiddleware } from './middleware';

// 开发环境下使用 redux-devtools-extension
// trace: true 会在控制台打印出 action 的来源
// composeEnhancers 用于合并多个中间件
// compose 用于合并多个 store enhancer
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer,
  user: userReducer,
});

// combineReducers原理：本质上是一个函数，接收一个对象作为参数，返回一个函数，这个函数接收一个state和一个action作为参数，返回一个新的state
// const reducer = (state = {}, action) => {
//   return {
//     counter: counterReducer(state.counter, action),
//     home: homeReducer(state.home, action)
//   }
// }

// 使用redux-thunk中间件
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// 不使用redux-thunk中间件,而是使用自定义中间件,在这是还原没有中间件的代码，中间件使用的是自定义thunk函数
const store = createStore(reducer, composeEnhancers());

// 调用中间件
applyMiddleware(logger, thunk)(store);

export default store;
