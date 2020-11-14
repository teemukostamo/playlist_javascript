// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Artist = require('../models/Artist');
const { artists } = require('./seeds/artistSeed');

let token;

beforeAll(async () => {
  await Artist.destroy({
    where: {},
    truncate: true,
  });

  await Artist.bulkCreate(artists);

  const loginCredentials = {
    username: 'teemu',
    password: 'test',
  };
  const req = await api.post('/api/login').send(loginCredentials);
  token = req.body.token;
  console.log('should run third');
});

it('unknown endpoint should return 404 & error message', async () => {
  console.log('should run fourth§');
  const result = await api
    .get('/api/artists/detail/6666')
    .set('Authorization', `bearer ${token}`)
    .expect(404);

  expect(result.body.error).toEqual('unknown endpoint');
});

test('getting artist details should return 200 and artist name', async () => {
  const result = await api
    .get('/api/artists/details/1')
    .set('Authorization', `bearer ${token}`)
    .expect(200);

  console.log('artist details', result.body);

  expect(result.body.name).toEqual('Nine Inch Nails');
});

it('should return an error message and status 404 with a non-existing artist id', async () => {
  const result = await api
    .get('/api/artists/details/6666')
    .set('Authorization', `bearer ${token}`)
    .expect(404);

  expect(result.body.error).toEqual('no artist found with the id 6666');
});

// it('getting albums by artist should return 200 and list of albums', async () => {
//   const album = await api
//     .get('/api/artists/albumsby/2')
//     .set('Authorization', `bearer ${token}`);

//   console.log('album body', album.body);
//   await api
//     .get('/api/artists/albumsby/84965')
//     .set('Authorization', `bearer ${token}`)
//     .expect(200);

//   // expect(result.body[0].name).toEqual('Dirt');
//   // expect(result.body[0].artist_id).toEqual(3);
//   // expect(result.body[0].album_id).toEqual(3);
//   // expect(result.body).toHaveLength(1);
// });
