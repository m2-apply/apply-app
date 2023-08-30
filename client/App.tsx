import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './src/pages/LandingPage';
import MapView from './src/pages/Map';
import { GlobalContext } from './state';

const App = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  return (
    <div style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={isLoggedIn ? <Navigate to='/map' /> : <LandingPage />}
          />
          <Route
            path='/map'
            element={isLoggedIn ? <MapView /> : <Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
