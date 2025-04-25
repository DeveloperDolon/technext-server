import { z } from 'zod';

const reminderCreateZodSchema = z.object({
  body: z.object({
    reminder: z.object({
      title: z.string().min(1).max(100),
      notes: z.string().optional(),
      dueDate: z.coerce.date(),
      projectId: z.string(),
      clientId: z.string(),
      isCompleted: z.boolean().default(false),
    }),
  }),
});

const reminderUpdateZodSchema = z.object({
  body: z.object({
    reminder: reminderCreateZodSchema.shape.body.shape.reminder.partial(),
  }),
});

export const ReminderValidation = {
  reminderCreateZodSchema,
  reminderUpdateZodSchema,
};
