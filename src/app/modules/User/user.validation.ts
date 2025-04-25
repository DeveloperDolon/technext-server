import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
    user: z.object({
      email: z.string().email(),
      themePref: z.enum(['light', 'dark']).default('light'),
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
