const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Remove destructuring
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Apply rate limiter to these routes
router.post('/register', rateLimiter, register);
router.post('/login', rateLimiter, login);
router.get('/profile', authMiddleware, rateLimiter, getProfile);

module.exports = router;
