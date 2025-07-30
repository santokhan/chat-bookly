import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    conversation_id: {
      type: String,
      required: true,
    },
    bound: {
      type: String,
      enum: ['inbound', 'outbound'],
      required: true,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
  },{
    timestamps: true,
  }
);

export default mongoose.model(
  'Conversation',
  conversationSchema,
);
