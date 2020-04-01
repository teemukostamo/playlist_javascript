const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getOneTrack,
  getPlayhistory,
  changeAlbum,
  changeArtist,
  updateTrack,
  addAndReport,
  addNewTrack,
  addDjonlineTracks,
  addTrackToAlbum
} = require('../controllers/tracks');

router.route('/details/:id').get(verifyUser, getOneTrack);
router.route('/history/:id').get(verifyUser, getPlayhistory);
router.route('/updatealbum').put(verifyUser, changeAlbum);
router.route('/updateartist').put(verifyUser, changeArtist);
router.route('/').put(verifyUser, updateTrack);
router.route('/addandreport').post(verifyUser, addAndReport);
router.route('/addtodb').post(verifyUser, addNewTrack);
router.route('/djonline').post(verifyUser, addDjonlineTracks);
router.route('/addtracktoalbum').post(verifyUser, addTrackToAlbum);

module.exports = router;
