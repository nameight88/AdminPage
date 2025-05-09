// server/config/db.js
import sql from 'mssql';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './env.js';

const poolConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};

let poolPromise = null;

export function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(poolConfig);
  }
  return poolPromise;
}
