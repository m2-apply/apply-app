import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

console.log('Entry Point Successful');

const root = createRoot(document.getElementById('root'));
root.render();
