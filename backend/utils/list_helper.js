const _ = require('lodash');

const artists = [
  {
    id: 849,
    name: 'AGEBJÖRN JOHAN (FEATURING SALLY SAPHIRO)',
    spotify_id: null,
    old_id: 40277,
    user_id: null,
    created_at: '2011-07-20T16:49:18.000Z',
    updated_at: '2011-07-20T16:49:18.000Z'
  },
  {
    id: 7463,
    name: 'CARTER DEANA',
    spotify_id: null,
    old_id: 37752,
    user_id: null,
    created_at: '2011-07-20T16:49:24.000Z',
    updated_at: '2011-07-20T16:49:24.000Z'
  },
  {
    id: 81372,
    name: 'DANIEL KLAUSER',
    spotify_id: null,
    old_id: null,
    user_id: null,
    created_at: '2018-01-28T15:46:44.000Z',
    updated_at: '2018-01-28T15:46:44.000Z'
  }
];

const albums = [
  {
    id: 3337,
    artist_id: 38885,
    name: 'Alone II',
    local: 0,
    identifier: '0602517902619',
    label: 'Geffen',
    year: null,
    spotify_id: null,
    user_id: null,
    created_at: '2011-07-20T16:50:11.000Z',
    updated_at: '2011-07-20T17:26:49.000Z'
  },
  {
    id: 33617,
    artist_id: 21937,
    name: 'Peace',
    local: 0,
    identifier: 'ZENCD 2085',
    label: 'Zen Master Rec',
    year: null,
    spotify_id: null,
    user_id: null,
    created_at: '2011-07-20T16:50:44.000Z',
    updated_at: '2011-07-28T22:16:48.000Z'
  },
  {
    id: 22442,
    artist_id: 22303,
    name: 'JJ No2',
    local: 0,
    identifier: 'YOURS0115',
    label: 'Sincerely Yours',
    year: null,
    spotify_id: null,
    user_id: null,
    created_at: '2011-07-20T16:50:32.000Z',
    updated_at: '2011-07-20T17:25:24.000Z'
  }
];

const tracks = [
  {
    id: 22442,
    artist_id: 35478,
    album_id: 63921,
    identifier: 'RAMS 590 cd',
    label: 'Pyramid',
    name: 'Cadillac',
    side: 1,
    track_no: 1,
    length: 200,
    people: '| Mallet | Brown | Gibson | Johnsson |',
    comment: null,
    note: null,
    record_country: 'FI',
    country: 1,
    fixed: null,
    isrc: null,
    file: null,
    file_order: null,
    spotify_id: null,
    user_id: 40,
    old_id: 111134,
    created_at: '2006-07-26T17:28:53.000Z',
    updated_at: '2011-07-26T09:41:22.000Z'
  },
  {
    id: 83872,
    artist_id: 39495,
    album_id: 23400,
    identifier: 'vhf#92',
    label: 'VHF Records',
    name: 'Kensington Blues',
    side: 1,
    track_no: 1,
    length: 215,
    people: '| Rose Jack |',
    comment: null,
    note: null,
    record_country: 'US',
    country: 2,
    fixed: null,
    isrc: null,
    file: null,
    file_order: null,
    spotify_id: null,
    user_id: 52,
    old_id: 126018,
    created_at: '2007-05-23T19:26:04.000Z',
    updated_at: '2007-05-23T19:26:04.000Z'
  },
  {
    id: 63872,
    artist_id: 38755,
    album_id: 55724,
    identifier: 'rwb001',
    label: 'Race Will Begin',
    name: 'Hold Me',
    side: 2,
    track_no: 1,
    length: 312,
    people: '| Rimheden Sophie |',
    comment: null,
    note: null,
    record_country: null,
    country: 2,
    fixed: null,
    isrc: null,
    file: null,
    file_order: null,
    spotify_id: null,
    user_id: 52,
    old_id: 69572,
    created_at: '2004-06-13T14:08:54.000Z',
    updated_at: '2004-06-13T14:08:54.000Z'
  }
];

const users = [
  {
    id: 21,
    username: 'jarkko',
    password: 'OLD:ri11piJ5OK.4k',
    first_name: 'Jarkko',
    last_name: 'Luoma',
    email: null,
    address: null,
    zip: null,
    city: null,
    country: null,
    phone: null,
    status: null,
    level: 1,
    last_seen: '2003-05-31T14:19:34.000Z',
    reset_key: null,
    old_id: 27,
    created_at: '2011-07-20T16:49:17.000Z',
    updated_at: '2011-07-20T16:49:17.000Z'
  },
  {
    id: 99,
    username: 'teemuko',
    password: '40a5f999d869957954454cfb6ba7099a61238f2c',
    first_name: 'Teemu',
    last_name: 'Kostamo',
    email: 'teemu.kostamo@radiohelsinki.fi',
    address: null,
    zip: null,
    city: null,
    country: null,
    phone: null,
    status: 1,
    level: 3,
    last_seen: '2019-09-03T08:40:45.000Z',
    reset_key: 'kw32K4Y5KXEZGkqMgWZKGL3W336CS2PqardqCdxh',
    old_id: null,
    created_at: '2014-01-10T13:46:26.000Z',
    updated_at: '2019-09-03T08:40:45.000Z'
  },
  {
    id: 119,
    username: 'kitmund',
    password: 'cab2c38d7166ae8f62659398cc2735f6691984d9',
    first_name: 'Mikko',
    last_name: 'Viskari',
    email: 'kitmund@gmail.com',
    address: null,
    zip: null,
    city: 'Hesa',
    country: 'Suomi',
    phone: null,
    status: 1,
    level: 1,
    last_seen: '2016-04-28T16:44:25.000Z',
    reset_key: null,
    old_id: null,
    created_at: '2014-10-09T16:27:22.000Z',
    updated_at: '2016-04-28T16:44:25.000Z'
  }
];

const dummy = tracks => {
  return 1;
};

module.exports = {
  dummy
};
