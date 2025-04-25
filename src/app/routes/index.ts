import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { clientRoutes } from '../modules/Client/client.routes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
