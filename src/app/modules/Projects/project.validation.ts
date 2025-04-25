import { z } from 'zod';

const createProjectZodSchema = z.object({
  body: z.object({
    project: z.object({
      title: z.string().min(1).max(100),
      budget: z.number().min(0),
      clientId: z.string(),
      deadline: z.coerce.date(),
      status: z
        .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
        .default('PENDING'),
    }),
  }),
});

const updateProjectZodSchema = z.object({
  body: z.object({
    project: createProjectZodSchema.shape.body.shape.project.partial(),
  }),
});

export const ProjectValidation = {
  createProjectZodSchema,
  updateProjectZodSchema,
};
