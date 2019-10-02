const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const artistsRouter = require('./controllers/artists');
const tracksRouter = require('./controllers/tracks');
const albumsRouter = require('./controllers/albums');
const usersRouter = require('./controllers/users');
const middleware = require('./config/middleware');

console.log('connecting to', config.DB_URI);

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// initialize app

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.logger);
app.use(middleware.tokenExtractor);

app.use('/api/artists', artistsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
