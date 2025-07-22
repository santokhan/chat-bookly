import express from 'express';
const router = express.Router();
import controller from './appointment.controller';
import { requireRole } from '../../middlewares/role.middleware';

// Appointment Settings
router.post('/settings', requireRole(['Business', 'Admin']), controller.setSettings);
router.get('/settings/:businessId', controller.getSettings);
router.put('/settings/:businessId', requireRole(['Business', 'Admin']), controller.updateSettings);

// Appointment Booking
router.get('/available-dates/:businessId', controller.getAvailableDates);
router.get('/available-slots/:businessId/:date', controller.getAvailableTimeSlots);
router.post('/', requireRole(['Contact', 'Business', 'Admin']), controller.bookAppointment);
router.put('/:appointmentId', requireRole(['Contact', 'Business', 'Admin']), controller.rescheduleAppointment);
router.get('/:businessId', controller.getAppointments);

export default router;
