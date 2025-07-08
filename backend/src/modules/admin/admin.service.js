import Admin from './admin.model';
import bcrypt from 'bcryptjs';

const register = async (data) => {
  try {
    data.password = await bcrypt.hash(data.password, 10);
    const admin = await Admin.create(data);

    return {
      success: true,
      message: 'Admin registered',
      data: admin,
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
    const admin = await Admin.findOne({ email });
    if (!admin) return { success: false, message: 'Admin not found' };

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return { success: false, message: 'Invalid credentials' };

    return {
      success: true,
      message: 'Login successful',
      data: admin,
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
    const admin = await Admin.findOne({
      _id: id,
      isActive: true,
      deletedAt: null,
    });
    if (!admin)
      return {
        success: false,
        message: 'Admin not found',
      };

    return {
      success: true,
      message: 'Admin fetched successfully',
      data: admin,
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

    const admin = await Admin.findByIdAndUpdate(id, data, { new: true });
    if (!admin) return { success: false, message: 'Admin not found' };

    return {
      success: true,
      message: 'Admin updated',
      data: admin,
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
    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!admin) return { success: false, message: 'Admin not found' };
    return {
      success: true,
      message: 'Admin deleted',
      data: admin,
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
