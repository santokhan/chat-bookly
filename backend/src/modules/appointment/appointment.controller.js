const service = require('./appointment.service');
const AppointmentSettings = require('./appointmentSettings.model');
const { createSettings, updateSettings, bookAppointment } = require('./appointment.validation');

exports.setSettings = async (req, res) => {
  try {
    const { error } = createSettings.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const settings = new AppointmentSettings(req.body);
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const { businessId } = req.params;
    const settings = await AppointmentSettings.findOne({ businessId });
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { error } = updateSettings.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { businessId } = req.params;
    const settings = await AppointmentSettings.findOneAndUpdate({ businessId }, req.body, { new: true });
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableDates = async (req, res) => {
  try {
    const { businessId } = req.params;
    const dates = await service.getAvailableDates(businessId);
    res.json({ availableDates: dates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { businessId, date } = req.params;
    const slots = await service.getAvailableTimeSlots(businessId, date);
    res.json({ availableSlots: slots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { error } = bookAppointment.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const appointment = await service.bookAppointment(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { newDateTime } = req.body;
    const appointment = await service.rescheduleAppointment(appointmentId, newDateTime);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { filter } = req.query;
    const appointments = await service.getAppointments(businessId, filter);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
