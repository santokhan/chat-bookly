import Service from './service.model.js';

export async function createService(req, res) {
  try {
    const {
      title,
      description,
      time,
      category_id,
      business_id,
    } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }

    const service = await Service.create({
      title,
      description,
      time,
      category_id,
      business_id,
    });

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error,
    });
  }
}

export async function getServices(req, res) {
  try {
    const { category_id, business_id } = req.query;
    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }
    const filter = { business_id };
    if (category_id) filter.category_id = category_id;
    const services = await Service.find(filter);
    res.json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error,
    });
  }
}

export async function getService(req, res) {
  try {
    const {
      id,
    } = req.params;

    const service = await Service.findById(id);

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error,
    });
  }
}
