const Appointment = require('./appointment.model');
const AppointmentSettings = require('./appointmentSettings.model');
const mongoose = require('mongoose');
const moment = require('moment');

exports.getAvailableDates = async (businessId) => {
  const settings = await AppointmentSettings.findOne({ businessId });
  if (!settings) throw new Error('Settings not found');

  const today = moment().startOf('day');
  const availableDates = [];
  let dayCount = 0;

  while (availableDates.length < 7 && dayCount < 30) { // look ahead up to 30 days
    const date = today.clone().add(dayCount, 'days');
    const dayName = date.format('dddd');
    const isAvailable = settings.availability.some(a => a.day === dayName);

    // Check unavailability
    const isUnavailable = settings.unavailabilityDates.some(u =>
      date.isBetween(moment(u.from).startOf('day'), moment(u.to).endOf('day'), null, '[]')
    );

    if (isAvailable && !isUnavailable) {
      availableDates.push(date.format('YYYY-MM-DD'));
    }
    dayCount++;
  }
  return availableDates;
};

exports.getAvailableTimeSlots = async (businessId, dateStr) => {
  const settings = await AppointmentSettings.findOne({ businessId });
  if (!settings) throw new Error('Settings not found');

  const date = moment(dateStr, 'YYYY-MM-DD');
  const dayName = date.format('dddd');
  const dayAvailability = settings.availability.find(a => a.day === dayName);
  if (!dayAvailability) return [];

  // Check unavailability
  const isUnavailable = settings.unavailabilityDates.some(u =>
    date.isBetween(moment(u.from).startOf('day'), moment(u.to).endOf('day'), null, '[]')
  );
  if (isUnavailable) return [];

  // Get existing appointments for the day
  const startOfDay = date.clone().startOf('day');
  const endOfDay = date.clone().endOf('day');
  const appointments = await Appointment.find({
    businessId,
    appointmentDateTime: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() },
    status: { $ne: 'cancelled' }
  });

  // Generate slots
  const slots = [];
  let slotTime = moment(`${dateStr} ${dayAvailability.timings.from}`, 'YYYY-MM-DD HH:mm');
  const endTime = moment(`${dateStr} ${dayAvailability.timings.to}`, 'YYYY-MM-DD HH:mm');
  while (slotTime.isBefore(endTime)) {
    const slotEnd = slotTime.clone().add(dayAvailability.timeSlots, 'minutes');
    // Check if slot is already booked
    const isBooked = appointments.some(app =>
      moment(app.appointmentDateTime).isBetween(slotTime, slotEnd, null, '[)')
    );
    if (!isBooked) {
      slots.push(slotTime.format('HH:mm'));
    }
    slotTime = slotEnd;
  }
  return slots;
};

exports.bookAppointment = async (data) => {
  // Check for double booking
  const { businessId, appointmentDateTime } = data;
  const existing = await Appointment.findOne({
    businessId,
    appointmentDateTime: new Date(appointmentDateTime),
    status: { $ne: 'cancelled' }
  });
  if (existing) throw new Error('Time slot already booked');

  const appointment = new Appointment(data);
  await appointment.save();
  return appointment;
};

exports.rescheduleAppointment = async (appointmentId, newDateTime) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');

  // Check for double booking
  const existing = await Appointment.findOne({
    businessId: appointment.businessId,
    appointmentDateTime: new Date(newDateTime),
    status: { $ne: 'cancelled' }
  });
  if (existing) throw new Error('Time slot already booked');

  appointment.appointmentDateTime = newDateTime;
  await appointment.save();
  return appointment;
};

exports.getAppointments = async (businessId, filter) => {
  const now = moment();
  let start, end;
  switch (filter) {
    case 'daily':
      start = now.clone().startOf('day');
      end = now.clone().endOf('day');
      break;
    case 'weekly':
      start = now.clone().startOf('week');
      end = now.clone().endOf('week');
      break;
    case 'monthly':
      start = now.clone().startOf('month');
      end = now.clone().endOf('month');
      break;
    case 'yearly':
      start = now.clone().startOf('year');
      end = now.clone().endOf('year');
      break;
    default:
      start = null;
      end = null;
  }
  const query = { businessId };
  if (start && end) {
    query.appointmentDateTime = { $gte: start.toDate(), $lte: end.toDate() };
  }
  return Appointment.find(query).sort({ appointmentDateTime: 1 });
};
