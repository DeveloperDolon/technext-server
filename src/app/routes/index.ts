import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { clientRoutes } from '../modules/Client/client.routes';
import { projectRoutes } from '../modules/Projects/project.routes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
