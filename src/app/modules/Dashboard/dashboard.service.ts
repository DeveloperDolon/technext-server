
import prisma from '../../utils/prisma';
import { TUser } from '../../types';
import { Request } from 'express';

interface DashboardMetrics {
  totalClients: number;
  totalProjects: number;
  remindersDue: number;
  projectsByStatus: {
    PENDING: number;
    IN_PROGRESS: number;
    COMPLETED: number;
    CANCELLED: number;
  };
}

const getTotalClients = async (userId: string): Promise<number> => {
  return await prisma.client.count({ where: { userId } });
};

const getTotalProjects = async (userId: string): Promise<number> => {
  return await prisma.project.count({ where: { userId } });
};

const getDueRemindersCount = async (userId: string): Promise<number> => {
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  return await prisma.reminder.count({
    where: {
      userId,
      isCompleted: false,
      dueDate: {
        lte: oneWeekLater,
        gte: new Date()
      }
    }
  });
};

const getProjectsByStatus = async (userId: string) => {
  return await prisma.project.groupBy({
    by: ['status'],
    where: { userId },
    _count: { status: true }
  });
};

const formatProjectsByStatus = (projectsByStatus: { status: string; _count: { status: number } }[]) => {
  const defaultStatuses = {
    PENDING: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    CANCELLED: 0
  };

  projectsByStatus.forEach(({ status, _count }) => {
    if (status && _count?.status) {
      defaultStatuses[status as keyof typeof defaultStatuses] = _count.status;
    }
  });

  return defaultStatuses;
};

const getDashboardMetrics = async (
  req: Request & { user?: TUser }
): Promise<DashboardMetrics> => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error('User not authenticated');

    const [totalClients, totalProjects, remindersDue, projectsByStatus] = await Promise.all([
      getTotalClients(userId),
      getTotalProjects(userId),
      getDueRemindersCount(userId),
      getProjectsByStatus(userId)
    ]);

    return {
      totalClients,
      totalProjects,
      remindersDue,
      projectsByStatus: formatProjectsByStatus(projectsByStatus)
    };
  } catch (error) {
    throw new Error(`Failed to fetch dashboard metrics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const DashboardService = {
  getDashboardMetrics
};
