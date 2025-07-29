import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'normalize.css';
import '@assets/css/index.less';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@assets/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <App />
        </ThemeProvider>
      </Provider>
      {/* </Suspense> */}
    </HashRouter>
  </React.StrictMode>
);
