import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </StrictMode>
);