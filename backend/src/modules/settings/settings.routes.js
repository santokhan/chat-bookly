import express from 'express';
import {
  setBusinessSettings,
  setStaffSettings,
  getBusinessSettings,
  getStaffSettings,
  getNextAvailableDates,
  getNextAvailableTimes,
} from './settings.controller.js';
import { uploadGalleryImages } from '../../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/business/:business_id', uploadGalleryImages, setBusinessSettings);
router.post('/business/:business_id/staff/:staff_id', setStaffSettings);
router.get('/business/:business_id', getBusinessSettings);
router.get('/business/:business_id/staff/:staff_id', getStaffSettings);
router.get('/business/:business_id/available-dates', getNextAvailableDates);
router.get('/business/:business_id/staff/:staff_id/available-times/:date', getNextAvailableTimes);

export default router;
