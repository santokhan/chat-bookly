import express from 'express';
import adminController from './admin.controller';
const validate = require('../../middlewares/validate');
const { registerSchema, loginSchema } = require('./admin.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), adminController.register);
router.post('/login', validate(loginSchema), adminController.login);
router.get('/:id', adminController.getById);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.remove);

export default router;
