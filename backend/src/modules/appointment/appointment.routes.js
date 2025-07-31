import express from 'express';
const router = express.Router();
import { requireRole } from '../../middlewares/role.middleware.js';
import {
  setSettings,
  getSettings,
  updateSettings,
  getAvailableDates,
  getAvailableTimeSlots,
  bookAppointment,
  rescheduleAppointment,
  getAppointments,
  createWhatsAppAppointment,
  updateWhatsAppAppointmentService,
  updateWhatsAppAppointmentStaff,
  updateWhatsAppAppointmentDate,
  updateWhatsAppAppointmentTime,
  getWhatsAppAppointment,
  getBusinessServicesForWhatsApp,
  getBusinessStaffForWhatsApp,
  getAvailableDatesForWhatsApp,
  getAvailableTimeSlotsForWhatsApp,
} from './appointment.controller.js';

// Appointment Settings
router.post('/settings', requireRole(['Business', 'Admin']), setSettings);
router.get('/settings/:businessId', getSettings);
router.put('/settings/:businessId', requireRole(['Business', 'Admin']), updateSettings);

// Appointment Booking
router.get('/available-dates/:businessId', getAvailableDates);
router.get('/available-slots/:businessId/:date', getAvailableTimeSlots);
router.post('/', requireRole(['Contact', 'Business', 'Admin']), bookAppointment);
router.put('/:appointmentId', requireRole(['Contact', 'Business', 'Admin']), rescheduleAppointment);
router.get('/:businessId', getAppointments);

// WhatsApp Appointment Booking Routes (No authentication required)
router.post('/whatsapp/create', createWhatsAppAppointment);
router.put('/whatsapp/:appointmentId/service', updateWhatsAppAppointmentService);
router.put('/whatsapp/:appointmentId/staff', updateWhatsAppAppointmentStaff);
router.put('/whatsapp/:appointmentId/date', updateWhatsAppAppointmentDate);
router.put('/whatsapp/:appointmentId/time', updateWhatsAppAppointmentTime);
router.get('/whatsapp/:appointmentId', getWhatsAppAppointment);
router.get('/whatsapp/services/:businessId', getBusinessServicesForWhatsApp);
router.get('/whatsapp/staff/:businessId', getBusinessStaffForWhatsApp);
router.get('/whatsapp/dates/:businessId', getAvailableDatesForWhatsApp);
router.get('/whatsapp/slots/:businessId/:date', getAvailableTimeSlotsForWhatsApp);

export default router;
