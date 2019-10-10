const supertest = require('supertest');
const app = require('../app');
const dbConnection = require('../config/database');

const api = supertest(app);

test('track is returned as json', async () => {
  await api
    .get('/api/tracks/1234')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there is 193 users', async () => {
  const response = await api.get('/api/users');
  console.log('test response 15', response.body.length);

  expect(response.body.length).toBe(193);
});

test('the track identifier is ', async () => {
  const response = await api.get('/api/tracks/1234');

  expect(response.body.identifier).toBe('DIFB100CDP');
});

afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  dbConnection.close();
  done();
});
