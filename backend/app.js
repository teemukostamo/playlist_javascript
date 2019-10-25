const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const artistsRouter = require('./controllers/artists');
const tracksRouter = require('./controllers/tracks');
const albumsRouter = require('./controllers/albums');
const reportsRouter = require('./controllers/reports');
const reportslistRouter = require('./controllers/reportslist');
const reportDetailsRouter = require('./controllers/reportdetails');
const programsRouter = require('./controllers/programs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./config/middleware');

const db = require('./config/database');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// console.log(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
// console.log(path.resolve(__dirname, '../frontend/build/index.html'));
// console.log(path.join(__dirname, '../frontend', '/build/index.html'));

app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(bodyParser.json());
app.use(cors());
app.use(middleware.logger);
app.use(middleware.tokenExtractor);

app.use('/api/artists', artistsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/reportslist', reportslistRouter);
app.use('/api/reportdetails', reportDetailsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
