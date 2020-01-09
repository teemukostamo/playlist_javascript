const reportslistRouter = require('express').Router();
const db = require('../config/database');

const Report = require('../models/Report');

const asyncHandler = require('../middleware/async');
const verifyUser = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse');

// get all reports by month by current user
reportslistRouter.route('/all').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
     WHERE re.program_date like "${req.query.date}%"
     AND re.user_id = ${req.query.user}
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.status(200).json(reports);
  })
);

// get all reports of a month
reportslistRouter.route('/date/:date').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
     WHERE re.program_date like "${req.params.date}%"
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.status(200).json(reports);
  })
);

// get all in progress reports of a user
reportslistRouter.route('/user/:id').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
     WHERE re.user_id="${req.params.id}" AND re.status="0"
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.status(200).json(reports);
  })
);

// delete report - set status to 9
reportslistRouter.route('/:id').put(
  verifyUser,
  asyncHandler(async (req, res, next) => {
    const deletedReport = await Report.update(
      {
        status: 9
      },
      { where: { id: req.params.id } }
    );
    if (deletedReport[0] === 0) {
      return next(
        new ErrorResponse(`no report found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(`${deletedReport[0]} rows affected`);
  })
);

module.exports = reportslistRouter;
