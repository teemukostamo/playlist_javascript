const reportsRouter = require('express').Router();
// const Report = require('../models/Report');
const db = require('../config/database');
// rerun null = suora, 1 = uusinta

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

// get report-tracks by report_id
reportsRouter.get('/:id', async (req, res, next) => {
  try {
    console.log('req params id at reports controller', req.params.id);
    let report = await db.query(
      'SELECT rt.sortable_rank, ar.name as artist_name, tr.name as track_title, tr.length as length, tr.id as track_id, ar.id as artist_id FROM playlist__track as tr, playlist__artist as ar, playlist__report_track as rt WHERE rt.report_id = :report_id and ar.id = tr.artist_id and rt.track_id = tr.id order by sortable_rank asc',
      {
        replacements: { report_id: req.params.id },
        type: db.QueryTypes.SELECT
      }
    );
    res.json(report);
  } catch (exception) {
    next(exception);
  }
});

// find all reports of a single user by id
// reportsRouter.get('/list/:id', async (req, res, next) => {
//   try {
//     const reports = await Report.findAll({
//       where: {
//         user_id: req.params.id
//       }
//     });
//     if (reports) {
//       console.log(reports);
//       // const reportTrack = await ReportTrack.findAll({
//       //   where: { report_id: report.id, status: 0 }
//       // });
//       res.json(reports.map(report => report.toJSON()));
//     } else {
//       res.status(404).end();
//     }
//   } catch (exception) {
//     next(exception);
//   }
// });

module.exports = reportsRouter;
