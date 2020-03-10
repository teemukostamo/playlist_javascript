const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getReportTracks,
  addTrackToReport,
  deleteTrackFromReport,
  updateSortableRanks,
  getSiteTracklist
} = require('../controllers/reports');

router.route('/site').get(getSiteTracklist);

router
  .route('/:id')
  .get(verifyUser, getReportTracks)
  .delete(verifyUser, deleteTrackFromReport)
  .put(verifyUser, updateSortableRanks);

router.route('/').post(verifyUser, addTrackToReport);

module.exports = router;
