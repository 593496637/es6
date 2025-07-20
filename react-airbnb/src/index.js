import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'normalize.css';
import '@assets/css/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
