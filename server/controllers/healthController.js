// server/controllers/healthController.js
export function getHealth(req, res) {
    res.json({ status: 'ok', env: process.env.NODE_ENV });
  }
  