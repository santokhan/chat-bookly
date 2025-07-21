import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import * as userController from './user.controller.js';
import auth from '../../middlewares/auth.middleware.js';
import { registerSchema, loginSchema, updateSchema } from './user.validation.js';

const router = Router();

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
