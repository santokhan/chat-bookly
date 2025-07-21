import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().min(8),
  password: z.string().min(6),
  role: z.enum(['admin', 'staff', 'business', 'user']),
  business_id: z.string().optional(), // required for staff, ignored for others
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone_number: z.string().min(8).optional(),
  password: z.string().min(6).optional(),
  is_verified: z.boolean().optional(),
  is_active: z.boolean().optional(),
  permissions: z.array(z.any()).optional(),
});
