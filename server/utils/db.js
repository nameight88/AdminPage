// server/utils/db.js
import { getPool } from '../config/db.js';

export async function query(sql, params = {}) {
  const pool = await getPool();
  const req  = pool.request();
  for (const [key, val] of Object.entries(params)) {
    req.input(key, val);
  }
  const result = await req.query(sql);
  return result.recordset;
}
