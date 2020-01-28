const express = require('express');
const verifyUser = require('../middleware/auth');
const router = express.Router();

const {
  autocompleteResults,
  advancedResults,
  merge,
  changeArtistOptions,
  changeAlbumOptions
} = require('../controllers/search');

router.route('/autocomplete/:query').get(verifyUser, autocompleteResults);

router
  .route('/advanced')
  .get(verifyUser, advancedResults)
  .put(verifyUser, merge);

router.route('/changeartist/:query').get(verifyUser, changeArtistOptions);
router.route('/changealbum/:query').get(verifyUser, changeAlbumOptions);

module.exports = router;
