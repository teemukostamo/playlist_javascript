const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getAllTransfers,
  sendFileToClient,
  generateTransferFile
} = require('../controllers/reporttransfer');

router
  .route('/')
  .get(verifyUser, getAllTransfers)
  .post(verifyUser, generateTransferFile);

router.route('/:filename').get(verifyUser, sendFileToClient);

module.exports = router;
