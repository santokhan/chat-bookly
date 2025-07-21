import Settings from './settings.model.js';

export async function setBusinessSettings(req, res) {
  try {
    const {
      business_id,
      ...data
    } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id required',
      });
    }

    let gallery = [];
    if (req.files && req.files.length > 0) {
      gallery = req.files.map(file => `/media/${file.filename}`);
    }

    let updateData = {
      business_id,
      ...data,
      staff_id: null,
    };

    if (gallery.length > 0) {
      const existing = await Settings.findOne({
        business_id,
        staff_id: null,
      });

      if (
        existing
        && existing.gallery
        && Array.isArray(existing.gallery)
      ) {
        updateData.gallery = [...existing.gallery, ...gallery];
      } else {
        updateData.gallery = gallery;
      }
    }

    const settings = await Settings.findOneAndUpdate(
      {
        business_id,
        staff_id: null,
      },
      updateData,
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set business settings',
      error,
    });
  }
}

export async function setStaffSettings(req, res) {
  try {
    const {
      staff_id,
      business_id,
      operational_hours,
      time_slot,
      unavailability_periods,
    } = req.body;

    if (!staff_id || !business_id) {
      return res.status(400).json({
        success: false,
        message: 'staff_id and business_id required',
      });
    }

    const settings = await Settings.findOneAndUpdate(
      {
        staff_id,
        business_id,
      },
      {
        staff_id,
        business_id,
        operational_hours,
        time_slot,
        unavailability_periods,
      },
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set staff settings',
      error,
    });
  }
}

export async function getBusinessSettings(req, res) {
  try {
    const {
      business_id,
    } = req.params;

    const settings = await Settings.findOne({
      business_id,
      staff_id: null,
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get business settings',
      error,
    });
  }
}

export async function getStaffSettings(req, res) {
  try {
    const {
      staff_id,
    } = req.params;

    const settings = await Settings.findOne({
      staff_id,
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get staff settings',
      error,
    });
  }
}
