const jwt = require('jsonwebtoken');
const reportDetailsRouter = require('express').Router();
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one track
reportDetailsRouter.get('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const report = await db.query(
      `SELECT pr.name as program_name, re.program_no, re.program_dj, re.program_date, re.program_start_time, 
      re.program_end_time, re.id as report_id, pr.id as program_id, re.rerun, re.status,
      re.user_id, us.username, us.first_name, us.last_name
      FROM playlist__program as pr, playlist__report as re, playlist__user as us
      WHERE re.id = ${req.params.id}
      and pr.id = re.program_id
      and re.user_id = us.id`
    );
    if (report) {
      console.log('report details router log', report);
      res.json(report[0]);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportDetailsRouter;
