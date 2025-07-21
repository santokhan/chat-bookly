import express from 'express';
import {
  setBusinessSettings,
  setStaffSettings,
  getBusinessSettings,
  getStaffSettings,
} from './settings.controller.js';
import { uploadGalleryImages } from '../../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/business', uploadGalleryImages, setBusinessSettings);
router.post('/staff', setStaffSettings);
router.get('/business/:business_id', getBusinessSettings);
router.get('/staff/:staff_id', getStaffSettings);

export default router;
