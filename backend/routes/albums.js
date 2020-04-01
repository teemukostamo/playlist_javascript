const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getOneAlbum,
  getAlbumTracklist,
  updateAlbum,
  changeArtist
} = require('../controllers/albums');

router
  .route('/albumdetails/:id')
  .get(verifyUser, getOneAlbum)
  .put(verifyUser, updateAlbum);

router.route('/tracklist/:id').get(verifyUser, getAlbumTracklist);

router.route('/updateartist').put(verifyUser, changeArtist);

module.exports = router;
