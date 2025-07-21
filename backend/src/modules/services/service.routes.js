import express from 'express';
import {
  createService,
  getServices,
  getService,
} from './service.controller.js';

const router = express.Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/:id', getService);

export default router;
