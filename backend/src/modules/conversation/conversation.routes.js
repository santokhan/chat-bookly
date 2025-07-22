import express from 'express';
import {
  createConversation,
  updateConversation,
} from './conversation.controller.js';

const router = express.Router();

router.post('/', createConversation);
router.put('/', updateConversation);

export default router;
