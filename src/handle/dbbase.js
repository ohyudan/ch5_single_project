import mysql from 'mysql2/promise';
import { DB1 } from '../constants/env.js';
import { formatDate } from '../util/dataFormatter.js';

const createPool = () => {
  const pool = mysql.createPool({
    host: DB1.host,
    port: DB1.DB1_PORT,
    user: DB1.DB1_USER,
    password: DB1.DB1_PASSWORD,
    database: DB1.DB1_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  const originalQuery = pool.query;
  pool.query = (sql, params) => {
    const date = new Date();

    console.log(
      `[${formatDate(date)}] Excuting query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`
    );
    return originalQuery.call(pool, sql, params);
  };
  return pool;
};

const pools = {
  GAME_DB: createPool(),
};

export default pools;
