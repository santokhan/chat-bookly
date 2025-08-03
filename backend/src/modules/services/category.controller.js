import User from '../user/user.model.js';
import Service from './service.model.js';
import Category from './category.model.js';

export async function createCategory(req, res) {
  try {
    const {
      title,
      description,
    } = req.body;

    const { business_id } = req.params;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const business = await User.findOne({ _id: business_id, role: 'business' });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
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
    const { business_id } = req.params;
    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }

    const business = await User.findOne({ _id: business_id, role: 'business' });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
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

export async function createService(req, res) {
  try {
    const { category_id, business_id } = req.params;

    const {
      title,
      description,
      service_time,
    } = req.body;

    if (!business_id || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id & category_id are required',
      });
    }

    const business = await User.findOne({ _id: business_id, role: 'business' });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    const category = await Category.findOne({ _id: category_id, business_id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Either category not found or does not belong to this business',
      });
    }

    const service = await Service.create({
      title,
      description,
      service_time,
      category_id,
      business_id,
    });

    await Category.findByIdAndUpdate(
      category_id,
      { $addToSet: { services: service._id } },
      { new: true },
    );

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

export async function getAllServices(req, res) {
  try {
    const { business_id } = req.params;
    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all services',
      error,
    });
  }
}

export async function getServices(req, res) {
  try {
    const { category_id, business_id } = req.params;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id is required',
      });
    }

    const business = await User.findOne({ _id: business_id, role: 'business' });
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    const filter = { business_id };
    let services = [];
    if (category_id) {
        const category = await Category.findOne({ _id: category_id, business_id });
        if (!category) {
          return res.status(404).json({
            success: false,
            message: 'Either category not found or does not belong to this business',
          });
        }

      filter.category_id = category_id;
      services = await Service.find(filter).populate('category_id');
    } else {
      services = await Service.find(filter);
    }

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
    const { service_id } = req.params;
    const service = await Service.findById(service_id);
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
