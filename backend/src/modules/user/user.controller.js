import User from './user.model.js';
import userService from './user.service.js';
import BusinessStaff from './businessStaff.model.js';

// export async function register(req, res) {
//   try {
//     const user = await userService.registerUser(req.body);

//     if (user.success) {
//       res.status(201).json(user);
//     } else {
//       res.status(400).json(user);
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);

    if (user.success) {
      res.status(201).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

// export async function login(req, res) {
//   try {
//     const user = await userService.loginUser(req.body);

//     if (user.success) {
//       res.status(200).json(user);
//     } else {
//       res.status(400).json(user);
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

const login = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(404).json(err);
  }
}

const update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (user.success) {
      res.status(204).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await User.find({
      role: 'business',
      deleted_at: null,
    });

    res.status(200).json({
      success: true,
      businesses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

const getAllBusinessStaffs = async (req, res) => {
  try {
    const {
      business_id,
    } = req.params;

    if (!business_id) {
      return res.status(400).json({ success: false, message: 'business_id is required' });
    }

    const staffLinks = await BusinessStaff.find({
      business_id,
      deleted_at: null,
    });

    const staffIds = staffLinks.map(link => link.staff_id);
    const staff = await User.find({
      _id: { $in: staffIds },
      role: 'staff',
      deleted_at: null,
    });

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

module.exports = {
  register,
  login,
  getUser,
  update,
  deleteUser,
  getAllBusinesses,
  getAllBusinessStaffs,
}
