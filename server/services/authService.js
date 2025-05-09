// server/services/authService.js
import * as ad from '../utils/ad.js';

export async function verifyUser(username, password) {
  // 기존 main.js 의 ActiveDirectory 인증 로직
  return ad.authenticate(username, password);
}
