// server/services/mailService.js
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../config/env.js';

const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: SMTP_PORT, auth: { user: SMTP_USER, pass: SMTP_PASS }});

export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({ from: SMTP_USER, to, subject, html });
}
