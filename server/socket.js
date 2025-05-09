// server/socket.js
import { Server } from 'socket.io';
import { logger } from './config/logger.js';
import { PORT, isProd } from './config/env.js';

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: isProd ? '*' : 'http://localhost:5173' }
  });

  io.on('connection', socket => {
    logger.info(`Socket 연결됨: ${socket.id}`);
    socket.on('disconnect', () => {
      logger.info(`Socket 해제됨: ${socket.id}`);
    });
    // 이벤트 핸들러 추가
  });
}
