import express from 'express';
import auth from '../../middlewares/auth';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/overview', auth(), DashboardController.getDashboardMetrics);

export const dashboardRoutes = router;
