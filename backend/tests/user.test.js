const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');
const helper = require('../tests/test_helper');

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'nodejstest',
    password: 'salainen'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

  const usernames = usersAtEnd.map(u => u.username);
  expect(usernames).toContain(newUser.username);
});

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'nodejs',
    password: 'nodejs'
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('User already exists!');

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(usersAtStart.length);
});
