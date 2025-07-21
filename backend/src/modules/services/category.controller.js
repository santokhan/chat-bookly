import Category from './category.model.js';

export async function createCategory(req, res) {
  try {
    const {
      title,
      description,
      business_id,
    } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }

    const category = await Category.create({
      title,
      description,
      business_id,
    });

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error,
    });
  }
}

export async function getCategories(req, res) {
  try {
    const { business_id } = req.query;
    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }
    const categories = await Category.find({ business_id }).populate('services');

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error,
    });
  }
}

export async function addServiceToCategory(req, res) {
  try {
    const {
      categoryId,
      serviceId,
    } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $addToSet: { services: serviceId } },
      { new: true },
    ).populate('services');

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add service to category',
      error,
    });
  }
}
