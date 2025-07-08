const { z } = require('zod');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{6,}$/;

const registerSchema = z.object({
  email: z.string().regex(
    emailRegex,
    'Invalid email format',
  ),
  password: z.string().regex(
    passwordRegex,
    'Password must be at least 6 characters, include at least one letter and one number',
  ),
});

const loginSchema = z.object({
  email: z.string().regex(
    emailRegex,
    'Invalid email format',
  ),
  password: z.string().regex(
    passwordRegex,
    'Password must be at least 6 characters, include at least one letter and one number',
  ),
});

module.exports = {
  registerSchema,
  loginSchema,
};
