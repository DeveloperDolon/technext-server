import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProjectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProjectIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});
const updateProject = catchAsync(async (req, res) => {
  const result = await ProjectService.updateProjectIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});
const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProjectIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  });
});
const projectList = catchAsync(async (req, res) => {
  const result = await ProjectService.projectListFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project list fetched successfully',
    data: result,
  });
});
const projectShow = catchAsync(async (req, res) => {
  const result = await ProjectService.projectShowById(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project list fetched successfully',
    data: result,
  });
});
export const ProjectController = {
  createProject,
  updateProject,
  deleteProject,
  projectList,
  projectShow,
};
