const express = require('express');
const verifyUser = require('../middleware/auth');
const router = express.Router();

const {
  getCurrentUsersReports,
  getAllReportsByMonth,
  getCurrentUsersInProgressReports,
  deleteReport
} = require('../controllers/reportslist');

router.route('/all').get(verifyUser, getCurrentUsersReports);
router.route('/date/:date').get(verifyUser, getAllReportsByMonth);
router.route('/user/:id').get(verifyUser, getCurrentUsersInProgressReports);
router.route('/:id').put(verifyUser, deleteReport);

module.exports = router;
