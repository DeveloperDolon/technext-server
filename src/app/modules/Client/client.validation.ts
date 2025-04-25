import { z } from 'zod';

const createClientZodSchema = z.object({
  body: z.object({
    client: z.object({
      name: z.string().min(1).max(100),
      email: z.string().email(),
      phone: z.string().optional(),
      company: z.string().optional(),
      notes: z.string().optional(),
      themePref: z.enum(['light', 'dark']).default('light'),
    }),
  }),
});

export const ClientValidation = {
  createClientZodSchema,
};
