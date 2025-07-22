import mongoose from 'mongoose';
const { Schema } = mongoose;

const availabilitySchema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    timings: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    timeSlots: {
      type: Number,
      required: true,
    },
  }, {
    _id: false,
  },
);

const unavailabilitySchema = new Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  }, {
    _id: false,
  },
);

const appointmentSettingsSchema = new Schema(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      unique: true,
    },
    availability: [availabilitySchema],
    unavailabilityDates: [unavailabilitySchema],
    aboutBusiness: {
      type: String,
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model(
  'AppointmentSettings',
  appointmentSettingsSchema,
);
