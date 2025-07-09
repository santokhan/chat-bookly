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
