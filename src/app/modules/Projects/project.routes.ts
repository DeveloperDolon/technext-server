import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../utils/validateRequest';
import { ProjectValidation } from './project.validation';
import { ProjectController } from './project.controller';

const router = express.Router();

router.post(
  '/create',
  auth(),
  validateRequest(ProjectValidation.createProjectZodSchema),
  ProjectController.createProject
);

router.put(
  '/update/:id',
  auth(),
  validateRequest(ProjectValidation.updateProjectZodSchema),
  ProjectController.updateProject
);

router.delete('/delete/:id', auth(), ProjectController.deleteProject);
router.get('/list', auth(), ProjectController.projectList);
router.get('/show/:id', auth(), ProjectController.projectShow);

export const projectRoutes = router;
