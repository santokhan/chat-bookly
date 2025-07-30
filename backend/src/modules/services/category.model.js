import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    }],
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, {
    timestamps: true,
  },
);

export default mongoose.model(
  'Category',
  categorySchema,
);
