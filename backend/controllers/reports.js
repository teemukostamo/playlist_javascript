const reportsRouter = require('express').Router();
const Report = require('../models/Report');
const ReportTrack = require('../models/Report_Track');

// rerun null = suora, 1 = uusinta

// find report by user id
// reportsRouter.get('/:id', async (req, res, next) => {
//   try {
//     const report = await Report.findOne({ where: { id: req.params.id } });
//     if (report) {
//       const reportTrack = await ReportTrack.findAll({
//         where: { report_id: report.id }
//       });
//       console.log('typeof report track', typeof reportTrack);
//       console.log('report track', reportTrack[1].dataValues.track_id);
//       res.json(report.toJSON());
//     } else {
//       res.status(404).end();
//     }
//   } catch (exception) {
//     next(exception);
//   }
// });

reportsRouter.get('/:id', async (req, res, next) => {
  try {
    const report = await ReportTrack.findOne({
      where: { report_id: req.params.id }
    });
    if (report) {
      console.log('report', report);
      res.json(report.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportsRouter;
