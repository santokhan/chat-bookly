import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    to: {
      type: Number,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    readyState: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
    bound: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: [String],
      default: [],
    },
  },{
    timestamps: true,
  }
);

export default mongoose.model(
  'Conversation',
  conversationSchema,
);
