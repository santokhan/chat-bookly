import mongoose from 'mongoose';

const whatsappFlowSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    flow_id: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  }, {
    timestamps: true,
  },
);

export default mongoose.model(
  'WhatsappFlow',
  whatsappFlowSchema,
);
