import express from 'express';
import whatsappController from './whatsapp.controller.js';

const router = express.Router();

// Both GET /auth and POST /webhook point to the same controller for now
router.get('/webhook', whatsappController.webhookHandler);
router.post('/webhook', whatsappController.webhookHandler);

export default router;
