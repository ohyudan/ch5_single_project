import { onData } from './onData.js';
import { onError } from './onError.js';
import { onEnd } from './onEnd.js';
export const onConnection = (socket) => {
  console.log(
    `Client connect from: ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.on('data', (data) => onData(socket, data));
  //socket.on('error', (socket) => onError(socket));
  //socket.on('end', (socket) => onEnd(socket));
};
