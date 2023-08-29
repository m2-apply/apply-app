import React, { useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SockJS from 'sockjs-client';

const App = () => {
  var sock = new SockJS('https://www.seismicportal.eu/standing_order');

  sock.onopen = function () {
    console.log('connected');
  };

  let message;
  sock.onmessage = function (e) {
    let msg = JSON.parse(e.data);
    message = msg;

    console.log('message received : ', msg);
  };

  sock.onclose = function () {
    console.log('disconnected');
  };
  return <div>hello</div>;
};

export default App;
