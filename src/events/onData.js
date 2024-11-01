import {
  PACKET_TYPE,
  PACKET_TYPE_LENGTH,
  TOTAL_LENGTH,
} from '../constants/header.js';
import { packetParser } from '../util/packetParser.js';
export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length > totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8BE(TOTAL_LENGTH);
    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL: {
            const result = packetParser(packet);
            console.log(result);
            break;
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      break;
    }
  }
};
