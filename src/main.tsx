import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/styles.scss';
import 'config/configureMobx.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
