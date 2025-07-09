import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'staff', 'business'],
      required: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    permissions: {
      type: Array,
      default: [],
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      default: null,
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model(
  'User',
  userSchema,
);
