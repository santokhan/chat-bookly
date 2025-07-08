import express from 'express';
import businessController from './business.controller';
const validate = require('../../middlewares/validate');
const { registerSchema, loginSchema } = require('./business.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), businessController.register);
router.post('/login', validate(loginSchema), businessController.login);
router.get('/:id', businessController.getById);
router.put('/:id', businessController.update);
router.delete('/:id', businessController.remove);

export default router; 