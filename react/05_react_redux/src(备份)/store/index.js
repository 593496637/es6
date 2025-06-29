import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// 开发环境下使用 redux-devtools-extension
// trace: true 会在控制台打印出 action 的来源
// composeEnhancers 用于合并多个中间件
// compose 用于合并多个 store enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;