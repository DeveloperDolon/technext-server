import express from 'express';
import auth from '../../middlewares/auth';
import { ClientValidation } from './client.validation';
import { ClientController } from './client.controller';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/create',
  auth(),
  validateRequest(ClientValidation.createClientZodSchema),
  ClientController.createClient
);

router.put(
  '/update/:id',
  auth(),
  validateRequest(ClientValidation.updateClientZodSchema),
  ClientController.updateClient
);

export const clientRoutes = router;
