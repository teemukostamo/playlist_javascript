const express = require('express');
const verifyUser = require('../middleware/auth');
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

router
  .route('/')
  .get(verifyUser, getAllUsers)
  .post(verifyUser, addUser);

router
  .route('/:id')
  .get(verifyUser, getOneUser)
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

module.exports = router;
