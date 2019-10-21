const reportslistRouter = require('express').Router();
const db = require('../config/database');

reportslistRouter.get('/:date', async (req, res, next) => {
  try {
    console.log('got request');
    let date = req.params.date;
    console.log('date from backend route', date);
    console.log('typeof date from backend route', typeof date);
    let reports = await db.query(
      `SELECT re.program_no, pr.name, re.program_date, re.program_start_time, re.program_end_time, re.status, re.rerun, re.program_dj, re.id FROM playlist__program as pr, playlist__report as re where re.program_date like "${date}%" and pr.id = re.program_id order by program_date asc, program_start_time asc`
    );
    // console.log('results from reports route', reports);
    res.json(reports[0]);
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
