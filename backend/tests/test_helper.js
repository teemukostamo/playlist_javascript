const fs = require('fs');
const path = require('path');
const db = require('../config/database');

const initDb = async () => {
  try {
    const splitQueries = fs
      .readFileSync(path.join(__dirname, 'playlist_test.sql'), 'utf-8')
      .split('\n');

    splitQueries.forEach(async (splitQuery) => {
      console.log('splitquery', splitQuery);
      await db.query(splitQuery, { raw: true });
    });
    console.log('helper ran');
  } catch (error) {
    console.log('trycatch error', error);
  }
};

module.exports = {
  initDb,
};
