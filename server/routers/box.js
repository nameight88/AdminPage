// server/routers/box.js
import { Router } from 'express';
import {
  getBoxSetInfo,
  getBoxHeightUseStateShowBoxNo,
  getBoxInfoList,
  getBoxStateList,
  searchControl,
  getCurrentLocker,
  updateReservation,
  getReservations,
  getGroupSummary,
  searchAll,
  checkBoxAvailability,
  approveReservation,
  checkUserBox
} from '../controllers/boxController.js';

const router = Router();

router.get('/getBoxSetInfo',                  getBoxSetInfo);
router.get('/getBoxHeightUseStateShowBoxNo',  getBoxHeightUseStateShowBoxNo);
router.get('/getBoxInfoList',                 getBoxInfoList);
router.get('/getBoxStateList',                getBoxStateList);
router.get('/searchControl',                  searchControl);
router.get('/getCurrentLocker',               getCurrentLocker);
router.get('/updateReservation',              updateReservation);
router.get('/getReservations',                getReservations);
router.get('/getGroupSummary',                getGroupSummary);
router.get('/searchAll',                      searchAll);
router.get('/checkBoxAvailability',           checkBoxAvailability);
router.get('/approveReservation',             approveReservation);
router.get('/checkUserBox',                   checkUserBox);

export default router;
