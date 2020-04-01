const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getOneArtist,
  getAllAlbumsByArtist,
  updateArtist
} = require('../controllers/artists');

router
  .route('/details/:id')
  .get(verifyUser, getOneArtist)
  .put(verifyUser, updateArtist);

router.route('/albumsby/:id').get(verifyUser, getAllAlbumsByArtist);

module.exports = router;
