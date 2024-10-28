import { handleEvent } from '../handle/helper.js';
export const onData = async (socket, data) => {
  await handleEvent(socket, data);
  data = Buffer.alloc(0); //초기화
};
