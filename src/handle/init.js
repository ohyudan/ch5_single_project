import header from '../header&packet/header.js';
import packet from '../header&packet/packet.js';
import { handle_List } from './handle_Mapping_list.js';
export const init = (socket, data) => {
  console.log('소켓접속요청');
  data = { deviceId: data, playerId: 1, latency: 2 };
  data = JSON.stringify(data);
  const response_Packet = packet.packet_Response(data);
  const response_Header = header.header_Add(data.length, 1);
  const result = Buffer.concat([response_Header, response_Packet]);
  console.log(`전송 ${result}`);
  socket.write(result);
};
