// server/routers/general.js
// INI 읽기, 로거, 사이트·사무실·그룹·영역 목록, ID 검색 등
import { Router } from 'express';
import {
  readIni,
  getLoggerConfig,
  getSiteInfo,
  getOfficeList,
  getGroupList,
  getAreaList,
  searchID
} from '../controllers/generalController.js';

const router = Router();

router.get('/readIniFile',   readIni);
router.get('/logger',        getLoggerConfig);
router.get('/getSiteInfo',   getSiteInfo);
router.get('/getOfficeList', getOfficeList);
router.get('/getGroupList',  getGroupList);
router.get('/getAreaList',   getAreaList);
router.get('/searchID',      searchID);

export default router;