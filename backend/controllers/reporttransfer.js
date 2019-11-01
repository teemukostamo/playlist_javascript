const jwt = require('jsonwebtoken');
const reportTransferRouter = require('express').Router();
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get all transfers
reportTransferRouter.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const transfers = await db.query(
      'SELECT rt.id, rt.user_id, us.username, us.first_name, us.last_name, rt.status, rt.filename, rt.period, rt.created_at, rt.updated_at FROM playlist__report_transfer as rt, playlist__user as us WHERE rt.user_id = us.id',
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.json(transfers);
  } catch (exception) {
    next(exception);
  }
});

// add a new transfer -get tracks from db, parse to teosto-required format and create txt-file

module.exports = reportTransferRouter;
