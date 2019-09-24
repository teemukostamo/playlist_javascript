const express = require('express');
const bodyParser = require('body-parser');
const artistsRouter = require('./controllers/artists');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// initialize app
const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/api/artists', artistsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
