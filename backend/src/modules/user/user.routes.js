import { Router } from 'express';
import * as userController from './user.controller.js';
import auth from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update/:id', auth, userController.update);
router.get('/:id', auth, userController.getUser);
router.delete('/:id', auth, requireRole('admin'), userController.deleteUser);

export default router;
