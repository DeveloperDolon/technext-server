import { Request } from 'express';
import { TUser } from '../../types';
import { Project } from '@prisma/client';
import prisma from '../../utils/prisma';

const createProjectIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Project> => {
  const project = {
    ...req.body.project,
    userId: req.user?.id,
  };

  const result = await prisma.project.create({ data: project });

  return result;
};

const updateProjectIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Project> => {
  const { id } = req.params;
  const project = {
    ...req.body.project,
  };

  const result = await prisma.project.update({
    where: { id: id, userId: req.user?.id },
    data: project,
  });

  if (!result) {
    throw new Error('Project not found');
  }

  return result;
};

const deleteProjectIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Project> => {
  const { id } = req.params;

  const result = await prisma.project.delete({
    where: { id: id, userId: req.user?.id },
  });

  if (!result) {
    throw new Error('Project not found');
  }
  return result;
};

const projectListFromDB = async (
  req: Request & { user?: TUser }
): Promise<Project[]> => {
  const projects = await prisma.project.findMany({
    where: { userId: req.user?.id },
  });

  return projects;
};

const projectShowById = async (
  req: Request & { user?: TUser }
): Promise<Project> => {
  const { id } = req.params;

  const result = await prisma.project.findUnique({
    where: { id: id, userId: req.user?.id },
  });

  if (!result) {
    throw new Error('Project not found');
  }

  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  updateProjectIntoDB,
  deleteProjectIntoDB,
  projectListFromDB,
  projectShowById,
};
