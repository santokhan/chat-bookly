import express from 'express';
import {
  createCategory,
  getCategories,
  addServiceToCategory,
} from './category.controller.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.post('/add-service', addServiceToCategory);

export default router; 