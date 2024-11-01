import { onData } from './onData.js';
import { onError } from './onError.js';
import { onEnd } from './onEnd.js';
export const onConnection = (socket) => {
  console.log(
    `Client connect from: ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.buffer = Buffer.alloc(0); //해당 클라이언트용 버퍼
  socket.on('data', onData(socket));
  //socket.on('error', (socket) => onError(socket));
  //socket.on('end', (socket) => onEnd(socket));
};
