import { Client } from '@prisma/client';
import { Request } from 'express';
import prisma from '../../utils/prisma';
import { TUser } from '../../types';

const clientCreateIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Client> => {
  const client = {
    ...req.body.client,
    userId: req.user?.id,
  };

  const result = await prisma.client.create({ data: client });

  return result;
};

const updateClientIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Client> => {
  const { id } = req.params;
  const client = {
    ...req.body.client,
  };

  const result = await prisma.client.update({
    where: { id: id, userId: req.user?.id },
    data: client,
  });

  if (!result) {
    throw new Error('Client not found');
  }

  return result;
};

const deleteClientIntoDB = async (
  req: Request & { user?: TUser }
): Promise<Client> => {

  const { id } = req.params;
  const result = await prisma.client.delete({
    where: { id: id, userId: req.user?.id },
  });
  
  if (!result) {
    throw new Error('Client not found');
  }
  return result;
};

export const ClientService = {
  clientCreateIntoDB,
  updateClientIntoDB,
  deleteClientIntoDB,
};
