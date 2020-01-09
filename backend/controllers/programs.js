const programsRouter = require('express').Router();
const db = require('../config/database');

const Program = require('../models/Program');
const Report = require('../models/Report');

const asyncHandler = require('../middleware/async');
const verifyUser = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse');

// get all active programs
programsRouter.route('/active').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
  })
);

// get all programs
programsRouter.route('/all').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
  })
);

// get one program
programsRouter.route('/getone/:id').get(
  verifyUser,
  asyncHandler(async (req, res, next) => {
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
  })
);

// create new program
programsRouter.route('/').post(
  verifyUser,
  asyncHandler(async (req, res) => {
    const savedProgram = await Program.create({
      user_id: req.body.user_id,
      identifier: req.body.identifier,
      name: req.body.name,
      display: 1,
      site: 1
    });
    res.status(201).json(savedProgram);
  })
);

// update program - get the id of program to update from req body
programsRouter.route('/update').put(
  verifyUser,
  asyncHandler(async (req, res, next) => {
    console.log(req.user);
    let { id, name, identifier, site, display } = req.body;
    const programToUpdate = await Program.update(
      {
        name,
        identifier,
        site,
        display
      },
      { where: { id: id } }
    );
    if (programToUpdate[0] === 0) {
      return next(new ErrorResponse(`no program found with the id ${id}`, 404));
    }
    res.status(200).json(`${programToUpdate[0]} row(s) affected`);
  })
);

// merge two programs
programsRouter.route('/merge').put(
  verifyUser,
  asyncHandler(async (req, res) => {
    let { merge, mergeTo } = req.body;
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
  })
);

module.exports = programsRouter;
