import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as Router from 'react-router-dom';
import App from './App.tsx';
import 'config/configureMobx.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>,
);
