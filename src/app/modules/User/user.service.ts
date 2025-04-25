import { User } from '@prisma/client';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const createUserIntoDB = async (req: Request): Promise<User> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const user = {
    ...req.body.user,
    password: hashedPassword,
  };

  const result = await prisma.user.create({ data: user });
  return result;
};

const loginUserIntoDB = async (req: Request) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: user.email,
      id: user.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: user.email,
      id: user.id,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userService = {
  createUserIntoDB,
  loginUserIntoDB,
};
