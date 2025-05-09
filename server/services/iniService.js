// server/services/iniService.js
import fs from 'fs';
import ini from 'ini';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

export async function readIniFile() {
  const content = await readFile('./server/config/app.ini', 'utf-8');
  return ini.parse(content);
}
