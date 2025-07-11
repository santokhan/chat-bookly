const express = require('express');
const {
  createConversation,
  updateConversation,
} = require('./conversation.controller.js');

const router = express.Router();

router.post('/', createConversation);
router.put('/', updateConversation);

module.exports = router;
