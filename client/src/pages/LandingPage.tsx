import React, { useContext } from 'react';
import '../styles/LandingPage';
import logo from '../assets/Apply.png';
import { GlobalContext } from '../../state';

async function auth() {
  const res = await fetch(`/api/user/login`, {
    method: 'POST',
  });
  const data = await res.json();
  window.location.href = data.url;
}

const LandingPage = () => {
  const { setLoggedIn } = useContext(GlobalContext);

  const handleLogin = () => {
    console.log('clicked');
    auth();
    // setLoggedIn(true);
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
