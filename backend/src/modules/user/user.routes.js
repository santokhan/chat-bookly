import { Router } from 'express';
import userController from './user.controller.js';
import auth from '../../middlewares/auth.middleware.js';

import {
  registerSchema,
  loginSchema,
  updateSchema,
} from './user.validation.js';
import validate from '../../middlewares/validate.js';

const router = Router({ mergeParams: true });

router.post(
  '/register',
  validate(registerSchema),
  userController.register,
);

router.post(
  '/login',
  validate(loginSchema),
  userController.login,
);

router.put(
  '/update/:id',
  auth,
  validate(updateSchema),
  userController.update,
);

router.get(
  '/get-all-businesses',
  userController.getAllBusinesses,
);

router.get(
  '/get-all-staffs/:business_id',
  userController.getAllBusinessStaffs,
);

router.get(
  '/:id',
  auth,
  userController.getUser,
);

router.delete(
  '/:id',
  auth,
  userController.deleteUser,
);

export default router;
