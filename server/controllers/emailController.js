// server/controllers/emailController.js
import * as mailService from '../services/mailService.js';

export async function sendMail(req, res, next) {
  try {
    const { to, subject, body } = req.query;
    await mailService.sendMail({ to, subject, html: body });
    res.json({ message: '메일 발송 완료' });
  } catch (err) { next(err); }
}
