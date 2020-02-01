const express = require('express');
const verifyUser = require('../middleware/auth');

const router = express.Router();

const {
  getAllActivePrograms,
  getAllPrograms,
  getOneProgram,
  createNewProgram,
  updateProgram,
  mergePrograms
} = require('../controllers/programs');

router.route('/active').get(verifyUser, getAllActivePrograms);
router.route('/all').get(verifyUser, getAllPrograms);
router.route('/getone/:id').get(verifyUser, getOneProgram);
router.route('/').post(verifyUser, createNewProgram);
router.route('/update').put(verifyUser, updateProgram);
router.route('/merge').put(verifyUser, mergePrograms);

module.exports = router;
