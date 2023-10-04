import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as Router from 'react-router-dom';
import App from './App.tsx';
import 'config/configureMobx.ts';

const ReactApp = (): React.ReactNode => {
  return (
    <React.StrictMode>
      <Router.BrowserRouter>
        <App />
      </Router.BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<ReactApp />);
