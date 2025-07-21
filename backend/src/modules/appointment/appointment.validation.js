const Joi = require('joi');

exports.createSettings = Joi.object({
  businessId: Joi.string().required(),
  availability: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      timings: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required(),
      }).required(),
      timeSlots: Joi.number().required(),
    })
  ).required(),
  unavailabilityDates: Joi.array().items(
    Joi.object({
      from: Joi.date().required(),
      to: Joi.date().required(),
    })
  ),
  aboutBusiness: Joi.string().allow(''),
});

exports.updateSettings = Joi.object({
  availability: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      timings: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required(),
      }).required(),
      timeSlots: Joi.number().required(),
    })
  ),
  unavailabilityDates: Joi.array().items(
    Joi.object({
      from: Joi.date().required(),
      to: Joi.date().required(),
    })
  ),
  aboutBusiness: Joi.string().allow(''),
});

exports.bookAppointment = Joi.object({
  businessId: Joi.string().required(),
  contactId: Joi.string().required(),
  appointmentDateTime: Joi.date().required(),
  appointmentDescription: Joi.string().allow(''),
});
