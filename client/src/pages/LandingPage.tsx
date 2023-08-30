import React, { useContext } from 'react';
import '../styles/LandingPage';
import logo from '../assets/Apply.png';
import { GlobalContext } from '../../state';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const CLIENT_ID = "697388643116-ej84pi3l2ahgf8mlu946k9uu6achff46.apps.googleusercontent.com";

type data = {
  name: string;
  email: string;
  picture: string;
}

const LandingPage = () => {
  const { setLoggedIn } = useContext(GlobalContext);

  const handleLogin = async (data: data) => {
    console.log('clicked');
    try {
      const cleanData = {
        name: data.name,
        email: data.email,
        picture: data.picture
      }
      const response = await axios.post('/api/login', cleanData);

      if (response.status === 200) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error in handleLogin:', error);
    }
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
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const decoded = jwt_decode(credentialResponse.credential || '');
              console.log(decoded);
              handleLogin(decoded as data);
              setLoggedIn(true);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
        {/* <div id="g_id_onload"
          data-client_id="697388643116-ej84pi3l2ahgf8mlu946k9uu6achff46.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-login_uri="http://localhost:8080/map"
          data-auto_prompt="false">
        </div>

        <div class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left">
        </div> */}
        <button className='genericButton white'>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
