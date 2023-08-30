import { WebSocketServer } from 'ws';

export const startWebsocketServer = () => {
  const sockserver = new WebSocketServer({ port: 4000 });
  sockserver.on('connection', ws => {
    console.log('new client connected');
    ws.send('connection established');

    ws.on('close', () => console.log('client disconnected'));

    ws.on('message', data => {
      sockserver.clients.forEach(client => {
        console.log(`distributing message: ${data}`);
        client.send(`${data}`);
      });
    });

    ws.onerror = () => console.log('Websocket Error');
  });
};
