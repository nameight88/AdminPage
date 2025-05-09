// server/controllers/boxController.js
import * as boxService from '../services/boxService.js';

export async function getBoxSetInfo(req, res, next) {
  try {
    const result = await boxService.getBoxSetInfo(req.query);
    res.json(result);
  } catch (err) { next(err); }
}

// … 나머지도 동일 패턴
export async function updateReservation(req, res, next) {
  try {
    const result = await boxService.updateReservation(req.query);
    res.json({ success: true, result });
  } catch (err) { next(err); }
}
