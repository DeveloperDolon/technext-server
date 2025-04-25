
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middlewares/auth';
import { ReminderValidation } from './reminder.validation';
import { ReminderController } from './reminder.controller';

const router = express.Router();

router.post(
  '/create',
  auth(),
  validateRequest(ReminderValidation.reminderCreateZodSchema),
  ReminderController.createReminder
);
  
router.put(
  '/update/:id',
  auth(),
  validateRequest(ReminderValidation.reminderUpdateZodSchema),
  ReminderController.updateReminder
);

router.delete('/delete/:id', auth(), ReminderController.deleteReminder);
router.get('/list', auth(), ReminderController.reminderList);
router.get('/show/:id', auth(), ReminderController.reminderShow);
router.get('/upcoming', auth(), ReminderController.upcomingReminderList);

export const reminderRoutes = router;