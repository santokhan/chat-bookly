import express from 'express';
import auth from '../../middlewares/auth.middleware.js';
import * as businessController from './business.controller.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.post(
  '/set-data',
  auth,
  requireRole('business', 'admin'),
  businessController.setData,
);

router.get(
  '/',
  auth,
  requireRole('business', 'admin'),
  businessController.getData,
);

export default router;
