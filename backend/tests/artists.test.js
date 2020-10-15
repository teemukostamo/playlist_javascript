// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

let token;

beforeAll(async () => {
  const loginCredentials = {
    username: 'test',
    password: 'test',
  };
  const req = await api.post('/api/login').send(loginCredentials);
  token = req.body.token;
});

it('getting artist details should return 200', async () => {
  await api
    .get('/api/artists/details/84969')
    .set('Authorization', `bearer ${token}`)
    .expect(200);
});
