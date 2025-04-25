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

export const ClientService = {
  clientCreateIntoDB,
};
