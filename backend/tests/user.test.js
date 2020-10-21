const fs = require('fs');
const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const db = require('../config/database');
const app = require('../app');

const api = supertest(app);

let token;

beforeAll(async () => {
  const splitQueries = fs
    .readFileSync(path.join(__dirname, 'playlist_test.sql'), 'utf-8')
    .split('\n');

  splitQueries.forEach(async (splitQuery) => {
    console.log('splitquery', splitQuery);
    await db.query(splitQuery, { raw: true });
  });

  const loginCredentials = {
    username: 'teemy',
    password: 'test',
  };
  const req = await api.post('/api/login').send(loginCredentials);
  token = req.body.token;
});

test('successful login returns 200', async () => {
  const loginCredentials = {
    username: 'teemy',
    password: 'test',
  };
  await api
    .post('/api/login')
    .send(loginCredentials)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

it('should require authorization', async () => {
  await api.get('/api/users').expect(401);
});

it('should return list of users', async () => {
  await api
    .get('/api/users')
    .set('Authorization', `bearer ${token}`)
    .expect(200);
});

it('should return an user with an existing id', async () => {
  const result = await api
    .get('/api/users/202')
    .set('Authorization', `bearer ${token}`)
    .expect(200);

  expect(result.body.username).toEqual('teemy');
});

it('should return an error message and status 404 with a non-existing user id', async () => {
  const result = await api
    .get('/api/users/6666')
    .set('Authorization', `bearer ${token}`)
    .expect(404);

  expect(result.body.error).toEqual('no user found with the id 6666');
});

it('should return an error message and status 400 when adding an existing username', async () => {
  const existingUser = {
    username: 'teemy',
    password: 'test',
    first_name: 'Matti',
    last_name: 'Luukkainen',
    email: 'matti.luukkainen@helsinki.fi',
    status: 1,
    level: 1,
  };
  const result = await api
    .post('/api/users/')
    .set('Authorization', `bearer ${token}`)
    .send(existingUser)
    .expect(400);

  expect(result.body.error).toEqual('User already exists!');
});

it('a user can be deleted', async () => {
  const usersAtStart = await api
    .get('/api/users')
    .set('Authorization', `bearer ${token}`)
    .expect(200);

  const userToDelete = usersAtStart.body[1];

  await api
    .delete(`/api/users/${userToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204);

  const usersAtEnd = await api
    .get('/api/users')
    .set('Authorization', `bearer ${token}`)
    .expect(200);

  expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length - 1);

  const contents = usersAtEnd.body.map((u) => u.username);

  expect(contents).not.toContain(userToDelete.username);
});
