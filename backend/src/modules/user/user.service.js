import User from './user.model.js';
import { signToken } from '../../utils/jwt.js';
import { comparePassword, hashPassword } from '../../utils/hash.js';
import Business from '../business/business.model.js';

export async function registerUser(data) {
  try {
    const { role, business_id, ...rest } = data;

    if (role === 'business') {
      const business = await Business.create({});
      const user = await User.create({
        ...rest,
        role: 'business',
        business_id: business._id,
        password: await hashPassword(data.password),
      });

      return {
        user,
        success: true,
        message: 'Business registered',
        token: signToken({
          id: user._id,
          role: user.role,
        }),
      };
    } else if (role === 'staff') {
      if (!business_id) {
        return {
          success: false,
          message: 'business_id required for staff',
        };
      }

      const user = await User.create({
        ...rest,
        role: 'staff',
        business_id,
        password: await hashPassword(data.password),
      });

      return {
        user,
        success: true,
        message: 'Staff registered',
        token: signToken({
          id: user._id,
          role: user.role,
        }),
      };
    } else if (role === 'admin') {
      const user = await User.create({
        ...rest,
        role: 'admin',
        password: await hashPassword(data.password),
      });

      return {
        user,
        success: true,
        message: 'Admin registered',
        token: signToken({
          id: user._id,
          role: user.role,
        }),
      };
    }

    return {
      success: false,
      message: 'Invalid role',
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

    console.log(data);

    if (data.email === 'admin@demo.com' && data.password === 'admin'){
      return {
        success: true,
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mn0.cat2xMrZLn0FwicdGtZNzL7ifDTAKWB0k1RurSWjdnw",
        userAbilityRules: [
          {
            action: 'manage',
            subject: 'all',
          },
        ],
        userData: {
          id: 1,
          fullName: "John Doe",
          username: "johndoe",
          avatar: "/images/avatars/avatar-1.png",
          email: "john@demo.com",
          role: "admin",
        },
      };
    } else {
      return {
        success: true,
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6M30.PGOfMaZA_T9W05vMj5FYXG5d47soSPJD1WuxeUfw4L4",
        userAbilityRules: [
          {
            action: 'read',
            subject: 'AclDemo',
          },
        ],
        userData: {
          id: 1,
          fullName: "Jane Doe",
          username: "janedoe",
          avatar: "/images/avatars/avatar-2.png",
          email: "jane@demo.com",
          role: "client",
        },
      };
    }
    
    // const { email, password } = data;

    // const user = await User.findOne({ email });
    // if (!user) {
    //   return {
    //     success: false,
    //     message: 'User not found',
    //   };
    // }

    // const isPasswordCorrect = await comparePassword(password, user.password);
    // if (!isPasswordCorrect) {
    //   return {
    //     success: false,
    //     message: 'Invalid credentials',
    //   };
    // }

    // return {
    //   user,
    //   success: true,
    //   message: 'Login successful',
    //   token: signToken({
    //     id: user._id,
    //     role: user.role,
    //   }),
    // };
  } catch (error) {
    return {
      error,
      success: false,
      message: 'Login failed',
    };
  }
}

export async function getUserWithBusiness(id) {
  try {
    const user = await User
      .findById(id)
      .populate('business_id')
      .lean();

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      user,
      success: true,
      message: 'User fetched',
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
