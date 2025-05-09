// server/routers/history.js
import { Router } from 'express';
import { searchHistory } from '../controllers/historyController.js';

const router = Router();
router.get('/searchHistory', searchHistory);
export default router;
