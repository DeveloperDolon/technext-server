import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../utils/validateRequest';
import { InteractionValidation } from './interaction.validation';
import { InteractionController } from './interaction.controller';

const router = express.Router();

router.post(
  '/create',
  auth(),
  validateRequest(InteractionValidation.createInteractionZodSchema),
  InteractionController.createInteraction
);

router.put(
  '/update/:id',
  auth(),
  validateRequest(InteractionValidation.updateInteractionZodSchema),
  InteractionController.updateInteraction
);
router.delete('/delete/:id', auth(), InteractionController.deleteInteraction);
router.get('/list', auth(), InteractionController.interactionList);
router.get('/show/:id', auth(), InteractionController.interactionShow);

export const interactionRoutes = router;
