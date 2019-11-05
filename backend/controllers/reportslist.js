const jwt = require('jsonwebtoken');
const reportslistRouter = require('express').Router();
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

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
      `SELECT re.program_no, pr.name, re.program_date, re.program_start_time, re.program_end_time, re.status, re.rerun, re.program_dj, re.id, re.user_id FROM playlist__program as pr, playlist__report as re where re.program_date like "${date}%" and pr.id = re.program_id order by program_date asc, program_start_time asc`,
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
      `SELECT re.program_no, pr.name, re.program_date, re.program_start_time, re.program_end_time, 
      re.status, re.rerun, re.program_dj, re.id, re.user_id 
      FROM playlist__program as pr, playlist__report as re 
      where re.user_id="${id}" and re.status="0" 
      and pr.id = re.program_id 
      order by program_date asc, program_start_time asc`,
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

module.exports = reportslistRouter;

// get all reports by month
// reportsRouter.get('/list/?date=:date', async (req, res, next) => {
//   try {
//     let date = req.params.date + '%';
//     console.log('date from backend route', date);
//     // date = date + '%';
//     // console.log(date);
//     // let testDate = '2019-10%';

//     // date value replacing still not working
//     let reports = await db.query(
//       'SELECT re.program_no, pr.name, re.program_date, re.program_start_time, re.program_end_time, re.status, re.rerun, re.program_dj, re.id FROM playlist__program as pr, playlist__report as re where re.program_date like :date and pr.id = re.program_id order by program_date asc',
//       {
//         replacements: { date: date },
//         type: db.QueryTypes.SELECT
//       }
//     );
//     console.log('results from reports route', reports);
//     res.json(reports);
//   } catch (exception) {
//     next(exception);
//   }
// });
