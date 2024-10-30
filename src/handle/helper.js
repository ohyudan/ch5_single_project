import { handle_List } from './handle_Mapping_list.js';
import header from '../header&packet/header.js';
import packet from '../header&packet/packet.js';
export const handleEvent = (socket, data) => {
  const handle_Result = header.haeder_Resive(data);
  const packet_Result = packet.packet_Resive(data);
  // console.log(handle_Result.lengthBuffer);
  // console.log([...data]);
  //console.log(packet_Result.toString('utf8'));
  data = packet_Result.toString('utf8');
  const handle = handle_List[handle_Result.handle_ID];
  handle(socket, data);
};
