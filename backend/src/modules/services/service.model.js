import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
        type: String,
      required: true,
    },
    description: {
      type: String,
    },
    time: {
      type: Number,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
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
  'Service',
  serviceSchema,
);
