// server/utils/decodeParams.js
export function decodeParams(req, res, next) {
    // 예: query string base64 디코딩
    if (req.query.data) {
      req.query = JSON.parse(Buffer.from(req.query.data, 'base64').toString());
    }
    next();
  }
  