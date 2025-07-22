import mongoose from 'mongoose';
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointmentDateTime: {
      type: Date,
      required: true,
    },
    appointmentDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'scheduled',
        'completed',
        'cancelled',
      ],
      default: 'scheduled',
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model('Appointment', appointmentSchema);
