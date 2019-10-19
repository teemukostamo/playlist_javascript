const reportsRouter = require('express').Router();
// const Report = require('../models/Report');
const db = require('../config/database');
// rerun null = suora, 1 = uusinta

// reportsrouter get test raw query - get all
reportsRouter.get('/list', async (req, res, next) => {
  try {
    let param = req.query.date;
    console.log(param);
    console.log(typeof param);
    let testvalue = '2018-10%';
    console.log(testvalue);
    console.log(typeof testvalue);
    // date value replacing still not working
    let reports = await db.query(
      'SELECT re.program_no, pr.name, re.program_date, re.program_start_time, re.program_end_time, re.status, re.rerun, re.program_dj, re.id FROM playlist__program as pr, playlist__report as re where re.program_date like :date and pr.id = re.program_id order by program_date asc',
      {
        replacements: { date: testvalue },
        type: db.QueryTypes.SELECT
      }
    );

    res.json(reports);
  } catch (exception) {
    next(exception);
  }
});

// get report-tracks by report_id
reportsRouter.get('/:id', async (req, res, next) => {
  try {
    console.log('req params id', req.params.id);
    let report = await db.query(
      'SELECT rt.sortable_rank, ar.name as artist_name, tr.name as track_title, tr.length as length, tr.id as track_id, ar.id as artist_id FROM playlist__track as tr, playlist__artist as ar, playlist__report_track as rt WHERE rt.report_id = :report_id and ar.id = tr.artist_id and rt.track_id = tr.id order by sortable_rank asc',
      {
        replacements: { report_id: req.params.id },
        type: db.QueryTypes.SELECT
      }
    );

    console.log(typeof report);
    console.log('report', report);

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
