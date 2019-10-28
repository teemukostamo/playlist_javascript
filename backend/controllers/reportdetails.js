const jwt = require('jsonwebtoken');
const reportDetailsRouter = require('express').Router();
const db = require('../config/database');
const Report = require('../models/Report');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one report details
reportDetailsRouter.get('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const report = await db.query(
      `SELECT pr.name as program_name, re.program_no, re.program_dj, re.program_date, re.program_start_time, 
      re.program_end_time, re.id, pr.id as program_id, re.rerun, re.status,
      re.user_id, us.username, us.first_name, us.last_name
      FROM playlist__program as pr, playlist__report as re, playlist__user as us
      WHERE re.id = ${req.params.id}
      and pr.id = re.program_id
      and re.user_id = us.id`,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (report) {
      console.log('report details router log', report);
      res.json(report);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// create new report
reportDetailsRouter.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    let {
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun
    } = req.body;

    const savedReport = await Report.create({
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun
    });
    console.log(savedReport);
    res.status(201).json(savedReport.toJSON());
  } catch (error) {
    next(error);
  }
});

// update existing report details
reportDetailsRouter.put('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    let {
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun
    } = req.body;

    const updatedReport = await Report.update(
      {
        user_id,
        program_id,
        program_date,
        program_start_time,
        program_end_time,
        program_no,
        program_dj,
        status,
        rerun
      },
      { where: { id: req.body.id } }
    );
    console.log(updatedReport);
    res.status(201).json(updatedReport);
  } catch (error) {
    next(error);
  }
});

module.exports = reportDetailsRouter;
