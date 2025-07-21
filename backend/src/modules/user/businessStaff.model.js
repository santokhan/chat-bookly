import mongoose from 'mongoose';

const businessStaffSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      index: true,
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  }, {
    timestamps: true,
  },
);

export default mongoose.model(
  'BusinessStaff',
  businessStaffSchema,
);
