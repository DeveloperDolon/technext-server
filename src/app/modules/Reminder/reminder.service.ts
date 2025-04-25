import { Reminder } from '@prisma/client';
import { TUser } from '../../types';
import prisma from '../../utils/prisma';
import { Request } from 'express';

const createReminderIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Reminder> => {
  const reminder = {
    ...req.body.reminder,
    userId: req.user?.id,
  };

  const result = await prisma.reminder.create({ data: reminder });

  return result;
};

const updateReminderIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Reminder> => {
  const { id } = req.params;
  const reminder = {
    ...req.body.reminder,
  };

  const result = await prisma.reminder.update({
    where: { id: id, userId: req.user?.id },
    data: reminder,
  });

  if (!result) {
    throw new Error('Reminder not found');
  }

  return result;
};

const deleteReminderIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Reminder> => {
  const { id } = req.params;
  const result = await prisma.reminder.delete({
    where: { id: id, userId: req.user?.id },
  });

  if (!result) {
    throw new Error('Reminder not found');
  }
  return result;
};

const upcomingReminderList = async (
  req: Request & { user?: TUser }
): Promise<Reminder[]> => {
  const startOfWeek = new Date();
  const endOfWeek = new Date();

  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: req?.user?.id,
      dueDate: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
      isCompleted: false,
    },
    orderBy: {
      dueDate: 'asc',
    },
    include: {
      client: true,
      project: true,
    },
  });

  return reminders;
};

const reminderListFromDB = async (
  req: Request & { user?: TUser }
): Promise<Reminder[]> => {
  const reminders = await prisma.reminder.findMany({
    where: { userId: req.user?.id },
    include: {
      client: true,
      project: true,
    },
  });

  return reminders;
};

const reminderShowById = async (
  req: Request & { user?: TUser }
): Promise<Reminder> => {
  const { id } = req.params;
  const reminder = await prisma.reminder.findUnique({
    where: { id: id, userId: req.user?.id },
    include: {
      client: true,
      project: true,
    },
  });
  if (!reminder) {
    throw new Error('Reminder not found');
  }
  return reminder;
};

export const ReminderService = {
  createReminderIntoDB,
  updateReminderIntoDB,
  deleteReminderIntoDB,
  reminderListFromDB,
  reminderShowById,
  upcomingReminderList,
};
