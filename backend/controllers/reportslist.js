const mysql = require('mysql');
const db = require('../config/database');
const Report = require('../models/Report');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all reports by month by current user
// @route   GET /all
// @access  Private
exports.getCurrentUsersReports = asyncHandler(async (req, res) => {
  const user = mysql.escape(req.query.user);
  const date = mysql.escape(`${req.query.date}%`);
  const reports = await db.query(
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
     WHERE re.program_date like ${date}
     AND re.user_id = ${user}
     ORDER BY program_date ASC, program_start_time ASC
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(reports);
});

// @desc    Get all reports of a month
// @route   GET /date/:date
// @access  Private
exports.getAllReportsByMonth = asyncHandler(async (req, res) => {
  const date = mysql.escape(`${req.params.date}%`);
  const reports = await db.query(
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
     WHERE re.program_date like ${date}
     ORDER BY program_date ASC, program_start_time ASC
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(reports);
});

// @desc    Get all in progress reports of a user
// @route   GET /user/:id
// @access  Private
exports.getCurrentUsersInProgressReports = asyncHandler(async (req, res) => {
  const id = mysql.escape(req.params.id);
  const reports = await db.query(
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
     WHERE re.user_id=${id} AND re.status="0"
     ORDER BY program_date ASC, program_start_time ASC
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(reports);
});

// @desc    Delete report - set status to 9
// @route   PUT /:id
// @access  Private
exports.deleteReport = asyncHandler(async (req, res, next) => {
  const deletedReport = await Report.update(
    {
      status: 9,
    },
    { where: { id: req.params.id } }
  );
  if (deletedReport[0] === 0) {
    return next(
      new ErrorResponse(`no report found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(`${deletedReport[0]} rows affected`);
});
