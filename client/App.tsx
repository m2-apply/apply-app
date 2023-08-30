import React, { useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SockJS from 'sockjs-client';

const App = () => {
  var sock = new SockJS('https://www.seismicportal.eu/standing_order');

  sock.onopen = function () {
    console.log('connected');
  };

  sock.onmessage = function (e) {
    let msg = JSON.parse(e.data);
    const latitude = msg.data.properties.lat;
    const longitude = msg.data.properties.lon;

    if (
      latitude >= 20 &&
      latitude <= 60 &&
      longitude <= -50 &&
      longitude >= -140
    ) {
      const filteredMsg = {
        id: msg.data.id,
        depth: msg.data.properties.depth,
        lat: latitude,
        lon: longitude,
        mag: msg.data.properties.mag,
        magtype: msg.data.properties.magtype,
        time: msg.data.properties.time,
      };
      console.log('filteredMsg', filteredMsg);
    }

    // console.log('message received : ', msg);
  };

  sock.onclose = function () {
    console.log('disconnected');
  };
  return <div>hello</div>;
};

export default App;
