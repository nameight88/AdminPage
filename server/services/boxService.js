// server/services/boxService.js
import { query } from '../utils/db.js';

export async function getBoxSetInfo({ areaCode }) {
  return query(`
    -- TODO: main.js 에서 쓰던 SQL 쿼리 그대로 붙여넣기
    SELECT * FROM dbo.tblBoxSet WHERE areaCode='${areaCode}'
  `);
}

// … 나머지도 함수 하나당 SQL 쿼리 복사
export async function updateReservation({ areaCode, boxNo, userCode, reservationTime, oldReservationTime, useState }) {
  const q = `
    UPDATE dbo.tblReservation
      SET reservationTime='${reservationTime}', updateTime=GETDATE(), useState=${useState}
     WHERE areaCode='${areaCode}'
       AND boxNo=${boxNo}
       AND userCode='${userCode}'
       AND CONVERT(varchar(19),reservationTime,120)='${oldReservationTime}'
  `;
  return query(q);
}
