import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import AppProviders from 'context';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
