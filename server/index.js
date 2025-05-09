// server/index.js
import './config/env.js';
import app from './app.js';
import http from 'http';
import { logger }       from './config/logger.js';
import { initSocket }   from './socket.js';
import { PORT }         from './config/env.js';

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => logger.info(`서버 실행 중 (port: ${PORT})`));
