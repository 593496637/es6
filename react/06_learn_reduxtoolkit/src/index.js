import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// 替换为自己实现的Provider
import { StoreContext } from './hoc';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // Provider在App.js、Home.jsx、Profile.jsx中使用
  // StoreContext.Provider在About.jsx中使用
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </Provider>
  // </React.StrictMode>
);
