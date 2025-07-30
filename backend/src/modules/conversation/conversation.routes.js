import express from 'express';
import {
  createConversation,
  getConversationsByBusinessAndUser,
  getConversationsByBusiness,
  getConversationsByUser,
} from './conversation.controller.js';

const router = express.Router();

router.post('/', createConversation);
router.get('/business-user', getConversationsByBusinessAndUser);
router.get('/business/:business_id', getConversationsByBusiness);
router.get('/user/:user_id', getConversationsByUser);

export default router;
