import dotenv from 'dotenv';

dotenv.config();
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '8500';

export const DB1 = {
  DB1_NAME: process.env.DB1_NAME,
  DB1_USER: process.env.DB1_USER,
  DB1_PASSWORD: process.env.DB1_PASSWORD,
  DB1_SERVERHOST: process.env.DB1_SERVERHOST,
  DB1_PORT: process.env.DB1_PORT,
};
