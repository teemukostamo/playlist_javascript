const reportDetailsRouter = require('express').Router();
const db = require('../config/database');

const Report = require('../models/Report');

const asyncHandler = require('../middleware/async');
const verifyUser = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse');

// get one report details
reportDetailsRouter.route('/details/:id').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const report = await db.query(
      `
      SELECT pr.name as program_name
      , re.program_no
      , re.program_dj
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.id
      , pr.id as program_id
      , re.rerun
      , re.status
      , re.user_id
      , us.username
      , us.first_name
      , us.last_name
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     INNER JOIN playlist__user as us ON re.user_id = us.id
     WHERE re.id = ${req.params.id}
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (report.length === 0) {
      return next(new ErrorResponse(`no report with id ${req.params.id}`, 404));
    }
    res.status(200).json(report);
  })
);

// create new report
reportDetailsRouter.route('/').post(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
    res.status(201).json(savedReport.toJSON());
  })
);

// update existing report details
reportDetailsRouter.route('/update/:id').put(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
    if (updatedReport[0] === 0) {
      return next(
        new ErrorResponse(`no report found with the id ${req.body.id}`, 404)
      );
    }
    console.log(updatedReport);
    res.status(200).json(`${updatedReport[0]} rows(s) affected`);
  })
);

module.exports = reportDetailsRouter;
