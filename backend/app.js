const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// import middleware
const logger = require('./middleware/logger');
const { errorHandler, unknownEndpoint } = require('./middleware/error');

// import routes
const albumsRouter = require('./routes/albums');
const artistsRouter = require('./routes/artists');
const loginRouter = require('./routes/login');
const programsRouter = require('./routes/programs');
const reportDetailsRouter = require('./routes/reportdetails');
const reportsRouter = require('./routes/reports');
const reportslistRouter = require('./routes/reportslist');
const reportTransferRouter = require('./routes/reporttransfer');
const searchRouter = require('./routes/search');
const top100Router = require('./routes/top100');
const tracksRouter = require('./routes/tracks');
const usersRouter = require('./routes/users');

// import db
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/', function(req, res) {
  res.sendFile(
    path.resolve(__dirname, '../frontend/build/', 'index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/reports*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/top100*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/search*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/transfer*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/users*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/programs*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/artist*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/album*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});
app.get('/track*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/', 'index.html'));
});

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.use('/api/artists', artistsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/reportslist', reportslistRouter);
app.use('/api/reportdetails', reportDetailsRouter);
app.use('/api/reporttransfer', reportTransferRouter);
app.use('/api/programs', programsRouter);
app.use('/api/search', searchRouter);
app.use('/api/top100', top100Router);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
