import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import { testAllConnections } from './util/connect_Test_db.js';
import pools from './handle/dbbase.js';
import initServer from './init/index.js';
const server = net.createServer(onConnection);

async function dataBase_Connect_Test() {
  await testAllConnections(pools);
}

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log('listen : ' + PORT);
      dataBase_Connect_Test();
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
