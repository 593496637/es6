import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContext, ThemeContext } from './04_useContext的使用/context';
// import App from './01_计数器实现对比/App';
// import App from './02_useState的使用/App';
// import App from './03_useEffect的使用/01_修改标题-class实现';
// import App from './03_useEffect的使用/03_清除机制-返回回调函数';
// import App from './03_useEffect的使用/04_逻辑分离-多个Effect';
// import App from './03_useEffect的使用/05_执行时机-控制回调执行';
// import App from './03_useEffect的使用/App';
// import App from './04_useContext的使用/App';
// import App from './05_useReducer的使用(了解)/App';
// import App from './06_useCallback的使用/App';
// import App from './07_useMemo的使用/App';
// import App from './08_useRef的使用/02_useRef绑定值-解决闭包陷阱';
// import App from './09_useImperativeHandle/App';
// import App from './10_useLayoutEffect的使用/01_layoutEffect和effect执行时机';
// import App from './10_useLayoutEffect的使用/03_切换数字-useLayoutEffect';
import App from './11_自定义hooks/01_打印生命周期';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext.Provider value={{ name: '小明', age: 18 }}>
      <ThemeContext.Provider value={{ color: 'red', size: 18 }}>
        <App />
      </ThemeContext.Provider>
    </UserContext.Provider>
  </React.StrictMode>
);
