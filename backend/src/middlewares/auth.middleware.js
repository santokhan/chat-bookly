import { verifyToken } from '../utils/jwt.js';
import User from '../modules/user/user.model.js';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || user.deleted_at) {
      return res.status(401).json({
        success: false,
        message: 'Invalid user',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
}
