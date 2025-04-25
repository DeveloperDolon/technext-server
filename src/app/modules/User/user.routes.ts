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

export const userRoutes = router;
