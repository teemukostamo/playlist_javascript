const jwt = require('jsonwebtoken');
const programsRouter = require('express').Router();
// const Program = require('../models/Program');
const db = require('../config/database');

// getTokenFrom eristää tokenin authorization -headeristä
const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get all active programs
programsRouter.get('/', async (req, res, next) => {
  try {
    // see if token exists
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    // const programs = await Program.findAll();
    const programs = await db.query(
      'SELECT * FROM playlist__program WHERE display = 1 order by name asc',
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.json(programs);
  } catch (exception) {
    next(exception);
  }
});

// get one program
programsRouter.get('/:id', async (req, res, next) => {
  try {
    // see if token exists
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    // const programs = await Program.findAll();
    const program = await db.query(
      `SELECT * FROM playlist__program WHERE id = ${req.params.id}`,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.json(program);
  } catch (exception) {
    next(exception);
  }
});

module.exports = programsRouter;
