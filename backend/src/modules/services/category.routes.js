import express from 'express';
import {
  createCategory,
  getCategories,
  createService,
  getServices,
  getService,
} from './category.controller.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/service', getServices);
router.get('/service/:category_id', getServices);
router.post('/:category_id/service', createService);
router.get('/:category_id/service/:service_id', getService);

export default router;
