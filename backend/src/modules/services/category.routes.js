import express from 'express';
import {
  createCategory,
  getCategories,
  createService,
  getServices,
  getService,
} from './category.controller.js';

const router = express.Router();

router.get('/:business_id', getCategories);
router.post('/:business_id', createCategory);
router.get('/service/:business_id', getServices);
router.get('/:business_id/:category_id/service', getServices);
router.post('/:business_id/:category_id/service', createService);
router.get('/:business_id/:category_id/service/:service_id', getService);

export default router;
