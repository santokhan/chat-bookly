import Appointment from './appointment.model';
import User from '../user/user.model';
import Service from '../services/service.model';
import moment from 'moment';

// Create or find appointment
export async function createOrFindAppointment(businessId, phoneNumber) {
  const user = await User.findOne({
    phone_number: phoneNumber,
  });

  let appointment = await Appointment.findOne({
    businessId,
    contactId: user._id,
    status: 'in_progress',
  });

  if (!appointment) {
    appointment = new Appointment({
      businessId,
      contactId: user._id,
      status: 'in_progress',
      bookingStep: 'service_selection'
    });
    await appointment.save();
  }

  return appointment;
};

// Update appointment with service selection
export async function updateService(appointmentId, serviceId) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');

  // Verify service exists and belongs to business
  const service = await Service.findOne({
    _id: serviceId,
    business_id: appointment.businessId
  });
  if (!service) throw new Error('Service not found');

  appointment.serviceId = serviceId;
  appointment.bookingStep = 'staff_selection';
  await appointment.save();

  return appointment;
};

// Update appointment with staff selection
export async function updateStaff(appointmentId, staffId) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');

  // Verify staff exists and belongs to business
  const staff = await User.findOne({
    _id: staffId,
    role: 'staff',
    is_active: true
  });
  if (!staff) throw new Error('Staff member not found');

  appointment.staffId = staffId;
  appointment.bookingStep = 'date_selection';
  await appointment.save();

  return appointment;
};

// Update appointment with date selection
export async function updateDate(appointmentId, date) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');

  // Validate date format
  if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
    throw new Error('Invalid date format. Use YYYY-MM-DD');
  }

  // Check if date is in the future
  if (moment(date).isBefore(moment(), 'day')) {
    throw new Error('Cannot book appointments in the past');
  }

  appointment.appointmentDate = date;
  appointment.bookingStep = 'time_selection';
  await appointment.save();

  return appointment;
};

export async function updateTime(appointmentId, time) {
  const appointment = await Appointment.findById(appointmentId).populate('serviceId', 'title').populate('staffId', 'name');
  if (!appointment) throw new Error('Appointment not found');
  
  appointment.appointmentTime = time;
  appointment.bookingStep = 'completed';
  await appointment.save();

  return appointment;
}

// Update appointment with time selection and finalize
export async function updateFinalStatus(appointmentId, status) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');

  appointment.bookingStep = 'completed';
  appointment.status = status;
  await appointment.save();

  return appointment;
};

// Get appointment by phone number
export async function getAppointmentByPhoneNumber(business_id, phoneNumber) {
  const user = await User.findOne({
    phone_number: phoneNumber,
  });

  const appointments = await Appointment.find({
    businessId: business_id,
    contactId: user._id,
    status: 'scheduled',
  }).populate('serviceId', 'title').populate('staffId', 'name');

  return appointments;
}

// Get appointment by ID
export async function getAppointmentById(appointmentId) {
  const appointment = await Appointment.findById(appointmentId)
    .populate('serviceId', 'title description service_time')
    .populate('staffId', 'name')
    .populate('businessId', 'name')
    .populate('contactId', 'name phone_number');
  
  return appointment;
};
