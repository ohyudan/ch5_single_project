import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import { testAllConnections } from './util/connect_Test_db.js';
import pools from './handle/dbbase.js';
const server = net.createServer((socket) => {
  onConnection(socket);
});

server.listen(PORT, HOST, () => {
  console.log('listen : ' + PORT);

  dataBase_Connect_Test();
});
async function dataBase_Connect_Test() {
  await testAllConnections(pools);
}
