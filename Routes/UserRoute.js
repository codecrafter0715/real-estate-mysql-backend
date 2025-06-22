const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.registerUser );
router.post('/login', userController.loginUser );
router.get('/getUserInfo', authMiddleware.auth, userController.getUserInfo);

module.exports = router;
