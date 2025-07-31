import service from './appointment.service.js';
import whatsappService from './whatsappAppointment.service.js';
import AppointmentSettings from './appointmentSettings.model.js';
// import {
//   createSettings,
//   updateSetting,
//   bookAppointmentValidator,
// } from './appointment.validation.js';

// export async function setStaffSettings(req, res) {
// export async function setSettings (req, res) {
//   try {
//     const { error } = createSettings.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const settings = new AppointmentSettings(req.body);
//     await settings.save();
//     res.status(201).json(settings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export async function getSettings (req, res) {
  try {
    const { businessId } = req.params;
    const settings = await AppointmentSettings.findOne({ businessId });
    if (!settings) return res.status(404).json({ error: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export async function updateSettings (req, res) {
//   try {
//     const { error } = updateSetting.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const { businessId } = req.params;
//     const settings = await AppointmentSettings.findOneAndUpdate({ businessId }, req.body, { new: true });
//     if (!settings) return res.status(404).json({ error: 'Settings not found' });
//     res.json(settings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export async function getAvailableDates (req, res) {
  try {
    const { businessId } = req.params;
    const dates = await service.getAvailableDates(businessId);
    res.json({ availableDates: dates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getAvailableTimeSlots (req, res) {
  try {
    const { businessId, date } = req.params;
    const slots = await service.getAvailableTimeSlots(businessId, date);
    res.json({ availableSlots: slots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export async function bookAppointment (req, res) {
//   try {
//     const { error } = bookAppointmentValidator.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const appointment = await service.bookAppointment(req.body);
//     res.status(201).json(appointment);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

export async function rescheduleAppointment (req, res) {
  try {
    const { appointmentId } = req.params;
    const { newDateTime } = req.body;
    const appointment = await service.rescheduleAppointment(appointmentId, newDateTime);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function getAppointments (req, res) {
  try {
    const { businessId } = req.params;
    const { filter } = req.query;
    const appointments = await service.getAppointments(businessId, filter);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// WhatsApp Appointment Booking Endpoints
export async function createWhatsAppAppointment (req, res) {
  try {
    const { businessId, contactId } = req.body;
    
    if (!businessId || !contactId) {
      return res.status(400).json({ error: 'businessId, contactId, and whatsappPhoneNumber are required' });
    }

    const appointment = await whatsappService.createOrFindAppointment(businessId, contactId);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function updateWhatsAppAppointmentService (req, res) {
  try {
    const { appointmentId } = req.params;
    const { serviceId } = req.body;
    
    if (!serviceId) {
      return res.status(400).json({ error: 'serviceId is required' });
    }

    const appointment = await whatsappService.updateService(appointmentId, serviceId);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function updateWhatsAppAppointmentStaff (req, res) {
  try {
    const { appointmentId } = req.params;
    const { staffId } = req.body;
    
    if (!staffId) {
      return res.status(400).json({ error: 'staffId is required' });
    }

    const appointment = await whatsappService.updateStaff(appointmentId, staffId);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function updateWhatsAppAppointmentDate (req, res) {
  try {
    const { appointmentId } = req.params;
    const { date } = req.body;
    
    if (!date) {
      return res.status(400).json({ error: 'date is required' });
    }

    const appointment = await whatsappService.updateDate(appointmentId, date);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function updateWhatsAppAppointmentTime (req, res) {
  try {
    const { appointmentId } = req.params;
    const { time } = req.body;
    
    if (!time) {
      return res.status(400).json({ error: 'time is required' });
    }

    const appointment = await whatsappService.updateTimeAndFinalize(appointmentId, time);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function getWhatsAppAppointment (req, res) {
  try {
    const { appointmentId } = req.params;
    const appointment = await whatsappService.getAppointmentById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getBusinessServicesForWhatsApp (req, res) {
  try {
    const { businessId } = req.params;
    const services = await whatsappService.getBusinessServices(businessId);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getBusinessStaffForWhatsApp (req, res) {
  try {
    const { businessId } = req.params;
    const staff = await whatsappService.getBusinessStaff(businessId);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getAvailableDatesForWhatsApp (req, res) {
  try {
    const { businessId } = req.params;
    const dates = await whatsappService.getAvailableDates(businessId);
    res.json({ availableDates: dates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getAvailableTimeSlotsForWhatsApp (req, res) {
  try {
    const { businessId, date } = req.params;
    const slots = await whatsappService.getAvailableTimeSlots(businessId, date);
    res.json({ availableSlots: slots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getAppointmentsForBusiness (req, res) {
  try {
    const { business_id } = req.params;
    const appointments = await whatsappService.getAppointmentsForBusiness(business_id);
    res.json({
      success: true,
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export default {
  // setSettings,
  getSettings,
  // updateSettings,
  getAvailableDates,
  getAvailableTimeSlots,
  // bookAppointment,
  rescheduleAppointment,
  getAppointments,
  createWhatsAppAppointment,
  updateWhatsAppAppointmentDate,
  updateWhatsAppAppointmentService,
  updateWhatsAppAppointmentStaff,
  updateWhatsAppAppointmentTime,
  getWhatsAppAppointment,
  getBusinessServicesForWhatsApp,
  getBusinessStaffForWhatsApp,
  getAvailableDatesForWhatsApp,
  getAvailableTimeSlotsForWhatsApp,
  getAppointmentsForBusiness,
}
