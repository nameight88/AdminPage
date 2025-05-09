// server/controllers/historyController.js
import * as boxService from '../services/boxService.js';

export async function searchHistory(req, res, next) {
  try {
    const result = await boxService.searchHistory(req.query);
    res.json(result);
  } catch (err) { next(err); }
}
