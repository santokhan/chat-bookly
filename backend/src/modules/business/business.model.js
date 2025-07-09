import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    business_meta: {
      type: String,
      default: '{}',
    },
    whatsapp_meta: {
      type: String,
      default: '{}',
    },
  },{
    timestamps: true,
  }
);

export default mongoose.model(
  'Business',
  businessSchema,
);
