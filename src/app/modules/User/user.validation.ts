import { z } from 'zod';

const createUserZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  themePreference: z.enum(['light', 'dark']).optional(),
});

export const UserValidation = {
  createUserZodSchema,
};
