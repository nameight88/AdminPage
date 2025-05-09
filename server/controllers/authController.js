// server/controllers/authController.js
import * as authService from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await authService.verifyUser(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.user = user;
    res.json({ message: '로그인 성공', user });
  } catch (err) { next(err); }
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: '로그아웃 완료' });
  });
}

export function getInfo(req, res) {
  res.json({ user: req.session.user || null });
}

export function getAge(req, res) {
  // TODO: main.js 에서 하던 생년월일→나이 계산 로직
//   res.json({ age: /* 계산값 */ });
}
