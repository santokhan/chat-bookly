import express from 'express';
import staffController from './staff.controller';
const validate = require('../../middlewares/validate');
const { registerSchema, loginSchema } = require('./staff.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), staffController.register);
router.post('/login', validate(loginSchema), staffController.login);
router.get('/:id', staffController.getById);
router.put('/:id', staffController.update);
router.delete('/:id', staffController.remove);

export default router;
