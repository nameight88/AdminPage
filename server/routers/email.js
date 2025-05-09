// server/routers/email.js
import { Router } from 'express';
import { sendMail } from '../controllers/emailController.js';

const router = Router();
router.get('/sendMail', sendMail);
export default router;
