import { handle_List } from './handle_List.js';
import header from '../header&packet/header.js';

export const handleEvent = (socket, data) => {
  const number = header.haeder_Resive_check(data);
  handle_List(number.handle_ID);
};
