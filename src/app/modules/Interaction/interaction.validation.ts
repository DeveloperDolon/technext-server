import { z } from 'zod';

const createInteractionZodSchema = z.object({
  body: z.object({
    interaction: z.object({
      notes: z.string().optional(),
      projectId: z.string(),
      clientId: z.string(),
      date: z.coerce.date(),
      type: z.enum(['EMAIL', 'CALL', 'MEETING']).default('EMAIL'),
    }),
  }),
});

const updateInteractionZodSchema = z.object({
  body: z.object({
    interaction:
      createInteractionZodSchema.shape.body.shape.interaction.partial(),
  }),
});

export const InteractionValidation = {
  createInteractionZodSchema,
  updateInteractionZodSchema,
};
