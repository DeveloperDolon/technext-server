import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);

router.post(
  '/login',
  validateRequest(UserValidation.loginUserZodSchema),
  userController.loginUser
);

router.get('/me', userController.me);

export const userRoutes = router;
