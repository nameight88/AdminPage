// server/controllers/generalController.js
import * as iniService from '../services/iniService.js';
import { logger }       from '../config/logger.js';

export async function readIni(req, res, next) {
  try {
    const data = await iniService.readIniFile();
    res.json(data);
  } catch (err) { next(err); }
}

export function getLoggerConfig(req, res) {
  // main.js 에서 하던 로거 설정 반환
  res.json({ level: logger.level/*…*/ });
}

// 나머지도 같은 패턴으로
export async function getSiteInfo(req, res, next) {
  // TODO: iniService나 db 쿼리로 구현
  res.json(/* site list */);
}

// … getOfficeList, getGroupList, getAreaList

export async function searchID(req, res, next) {
  const { id } = req.query;
  // TODO: AD 검색
  res.json(/* search 결과 */);
}

export async function getAreaList(){

};

export async function getGroupList(){

};

export async function getOfficeList(){

};