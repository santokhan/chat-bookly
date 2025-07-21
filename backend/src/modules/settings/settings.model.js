import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    street1: String,
    street2: String,
    city: String,
    zipcode: String,
    state: String,
    country: String,
  }, {
    _id: false,
  },
);

const operationalHourSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  }, {
    _id: false,
  },
);

const unavailabilitySchema = new mongoose.Schema(
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

const settingsSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    gallery_photos: {
      type: [String],
      validate: [arr => arr.length <= 10, 'Max 10 photos'],
    },
    business_info: {
      type: Object,
    },
    operational_hours: [operationalHourSchema],
    time_slot: {
      type: Number,
      enum: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
    unavailability_periods: [unavailabilitySchema],
    address: addressSchema,
    google_maps_url: {
      type: String,
    },
    additional_amenities: {
      type: [String],
    },
  }, {
    timestamps: true,
  },
);

export default mongoose.model(
  'Settings',
  settingsSchema,
);
