import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './utils/client';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

// 🔄 Handle missing chunk errors (e.g. after a new deploy)
window.addEventListener('error', (e) => {
  if (e.message && /Loading chunk [\d]+ failed/.test(e.message)) {
    console.warn('⚠️ Chunk load failed, reloading app...');
    window.location.reload();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
