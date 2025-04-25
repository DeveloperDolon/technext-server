import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { clientRoutes } from '../modules/Client/client.routes';
import { projectRoutes } from '../modules/Projects/project.routes';
import { interactionRoutes } from '../modules/Interaction/interaction.routes';
import { reminderRoutes } from '../modules/Reminder/reminder.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/client',
    route: clientRoutes,
  },
  {
    path: '/project',
    route: projectRoutes,
  },
  {
    path: '/interaction',
    route: interactionRoutes,
  },
  {
    path: '/reminder',
    route: reminderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
