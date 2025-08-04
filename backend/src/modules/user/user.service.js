import User from './user.model.js';
import { signToken } from '../../utils/jwt.js';
import { comparePassword, hashPassword } from '../../utils/hash.js';
import BusinessStaff from './businessStaff.model.js';

async function createUserEntry({
  name,
  email,
  phone_number,
  password,
  role,
  business_id,
  is_verified,
}) {
  const existingUser = await User.findOne({
    $or: [
      { email },
      { phone_number },
    ],
  });

  if (existingUser) {
    return {
      success: false,
      message: 'Email or phone number already exists',
    };
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    phone_number,
    password: hashedPassword,
    role,
    is_verified: is_verified || false,
  });

  if (role === 'staff' && business_id) {
    await BusinessStaff.create({
      business_id,
      staff_id: user._id,
    });
  }

  return { user, success: true };
}

function buildUserData(user) {
  return {
    id: user._id,
    fullName: user.name,
    username: user.email.split('@')[0],
    email: user.email,
    role: user.role,
  };
}

export async function registerUser(data) {
  try {
    const { role, business_id, ...reqData } = data;
    let user;

    if (
      role === 'business'
      || role === 'admin'
      || role === 'staff'
      || role === 'user'
    ) {
      const result = await createUserEntry({
        role,
        ...reqData,
        business_id,
      });

      if (!result.success) return result;
      user = result.user;
    } else {
      return {
        success: false,
        message: 'Invalid role',
      };
    }

    return {
      success: true,
      accessToken: signToken({ id: user._id, role: user.role }),
      userData: buildUserData(user),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Registration failed',
      error,
    };
  }
}

export async function loginUser(data) {
  try {
    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    return {
      success: true,
      accessToken: signToken({ id: user._id, role: user.role }),
      userData: buildUserData(user),
    };
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Login failed',
    };
  }
}

export async function getUserByPhoneNumber(phone_number) {
  try {
    const user = await User.findOne({ phone_number });
    return user;
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Get user by phone number failed',
    };
  }
}

export async function getUserById(id) {
  try {
    const user = await User
      .findById(id)
      .lean();

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User fetched',
      userData: buildUserData(user),
    };
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Get failed',
    };
  }
}

export async function updateUser(id, data) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      user,
      success: true,
      message: 'User updated',
    };
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Update failed',
    };
  }
}

export async function deleteUser(id) {
  try {
    const user = await User.findByIdAndUpdate(id, {
      is_active: false,
      deleted_at: new Date(),
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User deleted',
    };
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Delete failed',
    };
  }
}

export async function getStaffByBusinessId(business_id) {
  try {
    const staff = await BusinessStaff.find({ business_id }).populate('staff_id');
    return staff;
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Get staff by business id failed',
    };
  }
}

export default {
  registerUser,
  loginUser,
  getUserByPhoneNumber,
  getUserById,
  updateUser,
  deleteUser,
  getStaffByBusinessId,
}
