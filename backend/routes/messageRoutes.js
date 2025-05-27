const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const messageController = require('../controllers/messageControllers');

// Create a new message
router.post('/messages', middleware.authUser, messageController.createMessage);

// Fetch messages
router.get('/messages', middleware.authUser, messageController.fetchMessages);

module.exports = router;