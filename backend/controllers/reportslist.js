const jwt = require('jsonwebtoken');
const reportslistRouter = require('express').Router();
const db = require('../config/database');
const Report = require('../models/Report');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get all reports by month by current user
reportslistRouter.get('/all', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('got request');
    const date = req.query.date;
    const user = req.query.user;
    console.log('date from backend route', date);
    console.log('user from backend route', user);
    console.log('typeof date from backend route', typeof date);

    let reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like "${date}%"
     AND re.user_id = ${user}
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    // console.log('results from reports route', reports);
    res.json(reports);
  } catch (exception) {
    next(exception);
  }
});

// get all reports of a month
reportslistRouter.get('/date/:date', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('got request');
    let date = req.params.date;
    console.log('date from backend route', date);
    console.log('typeof date from backend route', typeof date);
    let reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like "${date}%"
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    console.log('results from reports route', reports);
    // console.log('report to get charcode from', reports[24]);
    // console.log('name at reports[24].name:', reports[24].name);
    // console.log(
    //   'charcode at reports[24].name.charCodeAt(2):',
    //   reports[24].name.charCodeAt(2)
    // );

    res.json(reports);
  } catch (exception) {
    next(exception);
  }
});

// get all in progress reports of a user
reportslistRouter.get('/user/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('got request');
    let id = req.params.id;
    console.log('id from backend route', id);
    console.log('typeof id from backend route', typeof id);
    let reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.user_id="${id}" AND re.status="0"
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    // console.log('results from reports route', reports);
    res.json(reports);
  } catch (exception) {
    next(exception);
  }
});

// delete report - set status to 9
reportslistRouter.delete('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const deletedReport = await Report.update(
      {
        status: 9
      },
      { where: { id: req.params.id } }
    );
    console.log(deletedReport);
    res.status(200).json(`${deletedReport[0]} rows affected`);
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportslistRouter;
