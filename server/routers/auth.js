// server/routers/auth.js
import { Router } from 'express';
import {
  login,
  logout,
  getInfo,
  getAge
} from '../controllers/authController.js';

const router = Router();
router.post('/login',  login);
router.post('/logout', logout);
router.get('/getInfo',  getInfo);
router.get('/getAge',   getAge);

export default router;
