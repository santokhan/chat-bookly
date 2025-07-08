import Staff from './staff.model';
import bcrypt from 'bcryptjs';

const register = async (data) => {
  try {
    data.password = await bcrypt.hash(data.password, 10);
    const staff = await Staff.create(data);
    return {
      success: true,
      message: 'Staff registered',
      data: staff,
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
    const staff = await Staff.findOne({ email });
    if (!staff) return { success: false, message: 'Staff not found' };

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return { success: false, message: 'Invalid credentials' };

    return {
      success: true,
      message: 'Login successful',
      data: staff,
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
    const staff = await Staff.findById(id);
    if (!staff) return { success: false, message: 'Staff not found' };

    return {
      success: true,
      message: 'Staff details fetched successfully',
      data: staff,
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

    const staff = await Staff.findByIdAndUpdate(id, data, { new: true });
    if (!staff) return { success: false, message: 'Staff not found' };

    return {
      success: true,
      message: 'Staff updated',
      data: staff,
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
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) return { success: false, message: 'Staff not found' };

    return {
      success: true,
      message: 'Staff deleted',
      data: staff,
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
