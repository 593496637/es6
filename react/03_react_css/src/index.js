import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

// import App from './App';
// import App from './01_内联样式的CSS/App';
// import App from './02_普通的CSS写法/App';
// import App from './03_CSS_Modules/App';
// import App from './04_Less编写方式/App'
// import App from './05_CSS-in-JS/App'
import App from './06_classnames库/App'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 设置them后，后代元素可以使用 */}
    <ThemeProvider theme={{ color: '#ff6a00', size: '30px' }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
