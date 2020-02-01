const db = require('../config/database');
const Program = require('../models/Program');
const Report = require('../models/Report');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all active programs
// @route   GET /active
// @access  Private
exports.getAllActivePrograms = asyncHandler(async (req, res, next) => {
  const programs = await db.query(
    'SELECT * FROM playlist__program WHERE display = 1 order by name asc',
    {
      type: db.QueryTypes.SELECT
    }
  );
  if (programs.length === 0) {
    return next(new ErrorResponse('no programs found', 404));
  }
  res.status(200).json(programs);
});

// @desc    Get all programs
// @route   GET /all
// @access  Private
exports.getAllPrograms = asyncHandler(async (req, res, next) => {
  const programs = await db.query(
    'SELECT * FROM playlist__program order by display desc, name asc',
    {
      type: db.QueryTypes.SELECT
    }
  );
  if (programs.length === 0) {
    return next(new ErrorResponse('no programs found', 404));
  }
  res.status(200).json(programs);
});

// @desc    Get one program
// @route   GET /getone/:id
// @access  Private
exports.getOneProgram = asyncHandler(async (req, res, next) => {
  const program = await db.query(
    `SELECT * FROM playlist__program WHERE id = ${req.params.id}`,
    {
      type: db.QueryTypes.SELECT
    }
  );
  if (program.length === 0) {
    return next(
      new ErrorResponse(`no programs found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(program);
});

// @desc    Create new program
// @route   POST /
// @access  Private
exports.createNewProgram = asyncHandler(async (req, res) => {
  const savedProgram = await Program.create({
    user_id: req.body.user_id,
    identifier: req.body.identifier,
    name: req.body.name,
    display: 1,
    site: 1
  });
  res.status(201).json(savedProgram);
});

// @desc    Update program - get the id of program to update from req body
// @route   PUT /update
// @access  Private
exports.updateProgram = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { id, name, identifier, site, display } = req.body;
  const programToUpdate = await Program.update(
    {
      name,
      identifier,
      site,
      display
    },
    { where: { id } }
  );
  if (programToUpdate[0] === 0) {
    return next(new ErrorResponse(`no program found with the id ${id}`, 404));
  }
  res.status(200).json(`${programToUpdate[0]} row(s) affected`);
});

// @desc    Merge two programs
// @route   PUT /merge
// @access  Private
exports.mergePrograms = asyncHandler(async (req, res) => {
  const { merge, mergeTo } = req.body;
  let transaction;
  try {
    transaction = await db.transaction();
    await Report.update(
      {
        program_id: mergeTo
      },
      { where: { program_id: merge } }
    );
    await Program.destroy({ where: { id: merge } });
    res.status(200).json('1 table affected');
  } catch (err) {
    if (transaction) await transaction.rollback();
  }
});
