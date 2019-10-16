const reportsRouter = require('express').Router();
const Report = require('../models/Report');
const ReportTrack = require('../models/Report_Track');
const db = require('../config/database');
// rerun null = suora, 1 = uusinta

// reportsrouter get test raw query
reportsRouter.get('/', async (req, res, next) => {
  try {
    let reports = await db.query(
      'SELECT * FROM playlist__report where program_date between "2018-01-01" and "2018-01-01"'
    );

    console.log(typeof reports[0]);
    reports = reports[1];

    res.json(reports);
  } catch (exception) {
    next(exception);
  }
});

// find all reports of a single user by id
reportsRouter.get('/list/:id', async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      where: {
        user_id: req.params.id
      }
    });
    if (reports) {
      console.log(reports);
      // const reportTrack = await ReportTrack.findAll({
      //   where: { report_id: report.id, status: 0 }
      // });
      res.json(reports.map(report => report.toJSON()));
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

//find a single report with tracks
reportsRouter.get('/tracks/:id', async (req, res, next) => {
  try {
    const report = await ReportTrack.findAll({
      where: { id: req.params.id }
    });
    console.log(typeof report);

    if (report) {
      res.json(report.map(r => r.toJSON()));
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportsRouter;
