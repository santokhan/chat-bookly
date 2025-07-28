import express from 'express';
import webhookService from './webhook.service.js';
import whatsappController from './whatsapp.controller.js';

const router = express.Router();

// Both GET /auth and POST /webhook point to the same controller for now
router.get('/webhook', webhookService.webhook);
router.post('/webhook', webhookService.webhook);
router.post('/business-data', whatsappController.getCompleteBusinessData);
router.post('/business-settings', whatsappController.getCompleteBusinessData);

export default router;
