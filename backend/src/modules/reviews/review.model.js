import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    replies: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
      },
      like: {
        type: Number,
        default: 0,
      },
      dislike: {
        type: Number,
        default: 0,
      },
      default: [],
    }],
  }, {
    timestamps: true,
  },
);

export default mongoose.model(
  'Review',
  reviewSchema,
);
