import { User } from '@prisma/client';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';

const createUserIntoDB = async (req: Request): Promise<User> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const user = {
    ...req.body.user,
    password: hashedPassword,
  };

  const result = await prisma.user.create({data: user});
  return result;
};

export const userService = {
  createUserIntoDB,
};
