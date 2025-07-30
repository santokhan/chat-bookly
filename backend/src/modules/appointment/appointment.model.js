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
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    appointmentDate: {
      type: String,
    },
    appointmentTime: {
      type: String,
    },
    appointmentDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'in_progress',
        'scheduled',
        'completed',
        'cancelled',
      ],
      default: 'in_progress',
    },
    whatsappPhoneNumber: {
      type: String,
    },
    bookingStep: {
      type: String,
      enum: ['service_selection', 'staff_selection', 'date_selection', 'time_selection', 'completed'],
      default: 'service_selection',
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model('Appointment', appointmentSchema);
