import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { GlobalProvider } from './state.tsx';
import './styles.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
