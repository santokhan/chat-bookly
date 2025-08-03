import Review from './review.model.js';
import User from '../user/user.model.js';

export async function addReview(req, res) {
  try {
    const {
      user_id,
      stars,
      comment,
    } = req.body;
    const { business_id } = req.params;

    if (
      !business_id
      || !user_id
      || !stars
    ) {
      return res.status(400).json({
        success: false,
        message: 'business_id, user_id, and stars required',
      });
    }

    const business = await User.findOne({_id: business_id, role: 'business'});
    if (!business) {
      return res.status(400).json({
        success: false,
        message: 'Business not found',
      });
    }

    const user = await User.findOne({_id: user_id, role: 'user'});
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const review = await Review.create({
      business_id,
      user_id,
      stars,
      comment,
    });

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error,
    });
  }
}

export async function getBusinessReviews(req, res) {
  try {
    const {
      business_id,
    } = req.params;

    const business = await User.findOne({_id: business_id, role: 'business'});
    if (!business) {
      return res.status(400).json({
        success: false,
        message: 'Business not found',
      });
    }

    const reviews = await Review.find({
      business_id,
    }).populate('user_id', 'name email');

    const avgStars = reviews.length
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
      : 0;

    res.json({
      success: true,
      reviews,
      avgStars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get reviews',
      error,
    });
  }
}
