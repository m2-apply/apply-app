import React, { useContext } from 'react';
import { GlobalContext } from '../../state';
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:4000');

ws.onopen = event => {
  console.log('WebSocket is open now.');
};

ws.onmessage = event => {
  console.log('Data received from server:', event.data);
};

ws.onclose = event => {
  if (event.wasClean) {
    console.log(
      `Connection closed cleanly, code=${event.code}, reason=${event.reason}`,
    );
  } else {
    console.log('Connection died');
  }
};

ws.onerror = error => {
  console.log(`[error] ${error.message}`);
};

export default ws;
