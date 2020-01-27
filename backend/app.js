const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// import middleware
const logger = require('./middleware/logger');
const { errorHandler, unknownEndpoint } = require('./middleware/error');

const albumsRouter = require('./routes/albums');
const artistsRouter = require('./routes/artists');
const loginRouter = require('./routes/login');
const programsRouter = require('./routes/programs');
const reportDetailsRouter = require('./routes/reportdetails');
const reportsRouter = require('./controllers/reports');
const reportslistRouter = require('./controllers/reportslist');
const reportTransferRouter = require('./controllers/reporttransfer');
const searchRouter = require('./controllers/search');
const top100Router = require('./controllers/top100');
const tracksRouter = require('./controllers/tracks');
const usersRouter = require('./controllers/users');

const db = require('./config/database');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// console.log(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
// console.log(path.resolve(__dirname, '../frontend/build/index.html'));
// console.log(path.join(__dirname, '../frontend', '/build/index.html'));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', function(req, res) {
  // res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
  res.sendFile(path.resolve(__dirname + '/build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/reports*', (req, res) => {
  console.log('hi from app.get reports');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/top100*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/search*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/transfer*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/users*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/propgrams*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/artist*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/album*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
app.get('/track*', (req, res) => {
  console.log('hi from app.get');
  console.log(req);
  console.log(res);
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
// app.get('/reports', (req, res) => {
//   console.log('hi from app.get');
//   console.log(req);
//   console.log(res);
//   res.sendFile(path.resolve(__dirname + '/build/index.html'));
// });

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

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
