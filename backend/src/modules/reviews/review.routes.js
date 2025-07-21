import express from 'express';
import { addReview, getBusinessReviews } from './review.controller.js';

const router = express.Router();

router.post('/:business_id', addReview);
router.get('/business/:business_id', getBusinessReviews);

export default router; 