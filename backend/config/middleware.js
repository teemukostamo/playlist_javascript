const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    });
  } else if (error.name === 'SequelizeAccessDeniedError') {
    return res.status(500).json({
      error: 'SequelizeAccessDeniedError: error accessing database'
    });
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error
    });
  }

  next(error);
};

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('token is ok');
    const token = authorization.substring(7);
    return token;
  }

  return null;
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  getTokenFrom
};
