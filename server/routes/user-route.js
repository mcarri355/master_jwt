const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  readUser,
} = require('../controllers/user-controller');

// routes controllers
router.get('/', readUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
