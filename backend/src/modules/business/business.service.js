import Business from './business.model';
import bcrypt from 'bcryptjs';

const register = async (data) => {
  try {
    data.password = await bcrypt.hash(data.password, 10);
    const business = await Business.create(data);

    return {
      success: true,
      message: 'Business registered',
      data: business,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Registration failed',
      error,
    };
  }
};

const login = async (email, password) => {
  try {
    const business = await Business.findOne({ email });
    if (!business) return { success: false, message: 'Business not found' };

    const match = await bcrypt.compare(password, business.password);
    if (!match) return { success: false, message: 'Invalid credentials' };

    return {
      success: true,
      message: 'Login successful',
      data: business,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Login failed',
      error,
    };
  }
};

const getById = async (id) => {
  try {
    const business = await Business.findById(id);
    if (!business) return { success: false, message: 'Business not found' };

    return {
      success: true,
      message: 'Business details fetched successfully',
      data: business,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Get failed',
      error,
    };
  }
};

const update = async (id, data) => {
  try {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    const business = await Business.findByIdAndUpdate(id, data, { new: true });
    if (!business) return { success: false, message: 'Business not found' };

    return {
      success: true,
      message: 'Business updated',
      data: business,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Update failed',
      error,
    };
  }
};

const remove = async (id) => {
  try {
    const business = await Business.findByIdAndUpdate(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!business) return { success: false, message: 'Business not found' };
    return {
      success: true,
      message: 'Business deleted',
      data: business,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Delete failed',
      error,
    };
  }
};

export default {
  register,
  login,
  getById,
  update,
  remove,
};
