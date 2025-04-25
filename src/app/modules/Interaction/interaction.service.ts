import { Interaction } from '@prisma/client';
import prisma from '../../utils/prisma';
import { TUser } from '../../types';
import { Request } from 'express';

const createInteractionIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Interaction> => {
  const interaction = {
    ...req.body.interaction,
    userId: req.user?.id,
  };

  const result = await prisma.interaction.create({ data: interaction });

  return result;
};

const updateInteractionIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Interaction> => {
  const { id } = req.params;
  const interaction = {
    ...req.body.interaction,
  };

  const result = await prisma.interaction.update({
    where: { id: id, userId: req.user?.id },
    data: interaction,
  });

  if (!result) {
    throw new Error('Interaction not found');
  }

  return result;
};

const deleteInteractionIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Interaction> => {
  const { id } = req.params;
  const result = await prisma.interaction.delete({
    where: { id: id, userId: req.user?.id },
  });

  if (!result) {
    throw new Error('Interaction not found');
  }
  return result;
};
const interactionListFromDB = async (
  req: Request & { user?: TUser }
): Promise<Interaction[]> => {
  const interactions = await prisma.interaction.findMany({
    where: { userId: req.user?.id },
  });

  return interactions;
};
const interactionShowFromDB = async (
  req: Request & { user?: TUser }
): Promise<Interaction> => {
  const { id } = req.params;
  const interaction = await prisma.interaction.findUnique({
    where: { id: id, userId: req.user?.id },
  });

  if (!interaction) {
    throw new Error('Interaction not found');
  }

  return interaction;
};

export const InteractionService = {
  createInteractionIntoDB,
  updateInteractionIntoDB,
  deleteInteractionIntoDB,
  interactionListFromDB,
  interactionShowFromDB,
};
