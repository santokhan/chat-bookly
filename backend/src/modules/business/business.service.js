import Business from './business.model.js';

export async function setBusinessData({ business_id, business_meta, whatsapp_meta }) {
  try {
    let business;

    if (business_id) {
      business = await Business.findById(business_id);

      if (!business) {
        return {
          success: false,
          message: 'Business not found',
        };
      }

      await Business.findByIdAndUpdate(
        business_id,
        { business_meta, whatsapp_meta },
        { new: true },
      );
    } else {
      business = await Business.create({
        business_meta,
        whatsapp_meta,
      });
    }

    return {
      success: true,
      message: 'Business data set successfully',
      business,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Set business data failed',
    };
  }
}

export async function getBusinessData(business_id = null) {
  try {
    if (business_id) {
      const business = await Business.findById(business_id);
      if (!business) {
        return {
          success: false,
          message: 'Business not found',
        };
      }
      return {
        success: true,
        business,
      };
    } else {
      const businesses = await Business.find();
      return {
        success: true,
        businesses,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'Get business data failed',
      error: err.message,
    };
  }
}
