const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const discussionController = require('../controllers/discussion.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to send a message
router.post('/:movieId/messages', [
  body('message').isString().isLength({ min: 3 })
], authMiddleware.authUser, discussionController.sendMessage);

// Route to get messages
router.get('/:movieId/messages', authMiddleware.authUser, discussionController.getMessages);

module.exports = router;