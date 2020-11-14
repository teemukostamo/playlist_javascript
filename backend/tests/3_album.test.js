/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const Album = require('../models/Album');
const { albums } = require('./seeds/albumSeed');

const api = supertest(app);

let token;

beforeAll(async () => {
  await Album.destroy({
    where: {},
    truncate: true,
  });

  await Album.bulkCreate(albums);

  const loginCredentials = {
    username: 'teemu',
    password: 'test',
  };
  const req = await api.post('/api/login').send(loginCredentials);
  token = req.body.token;
  console.log('should run third');
});

test('getting album details by id should return status 200, artist name and album name', async () => {
  const result = await api
    .get('/api/albums/albumdetails/1')
    .set('Authorization', `bearer ${token}`)
    .expect(200);

  console.log('album details', result.body);

  expect(result.body[0].album_name).toEqual('Downward Spiral');
  expect(result.body[0].artist_name).toEqual('Nine Inch Nails');
});

it('should return an error message and status 404 with a non-existing album id', async () => {
  const result = await api
    .get('/api/albums/albumdetails/6666')
    .set('Authorization', `bearer ${token}`)
    .expect(404);

  expect(result.body.error).toEqual('no album found with the id 6666');
});
