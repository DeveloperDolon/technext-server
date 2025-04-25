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

const createClientZodSchema = z.object({
  client: z.object({
    userId: z.string(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
    themePref: z.enum(['light', 'dark']).default('light'),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createClientZodSchema,
};
