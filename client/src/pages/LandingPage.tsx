import React, { useContext } from 'react';
import '../styles/LandingPage';
import logo from '../assets/Apply.png';
import { GlobalContext } from '../../state';

const LandingPage = () => {
  const { setLoggedIn } = useContext(GlobalContext);

  const handleLogin = () => {
    console.log('clicked');
    setLoggedIn(true);
  };

  return (
    <div className='landingPage'>
      <img src={logo} width='150' />
      <div>Hello World!</div>
      <div>Welcome to Seismic</div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button className='genericButton blue' onClick={handleLogin}>
          Login
        </button>
        <button className='genericButton white'>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
