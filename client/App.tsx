import React, { useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<LoginPage />}
        />
      </Routes>

    </BrowserRouter>)
};

export default App;
