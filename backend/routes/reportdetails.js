const express = require('express');
const verifyUser = require('../middleware/auth');
const router = express.Router();

const {
  getReportDetails,
  createNewReport,
  updateReportDetails
} = require('../controllers/reportdetails');

router.route('/details/:id').get(verifyUser, getReportDetails);
router.route('/').post(verifyUser, createNewReport);
router.route('/update/:id').put(verifyUser, updateReportDetails);

module.exports = router;
