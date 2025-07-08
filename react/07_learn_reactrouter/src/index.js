import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      {/* Suspense 是 React 18 引入的新特性，用于处理异步加载的组件，fallback 是当组件加载时显示的组件 */}
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </StrictMode>
);