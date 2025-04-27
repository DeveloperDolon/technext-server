import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { DashboardService } from './dashboard.service';

const getDashboardMetrics = catchAsync(async (req, res) => {
  const result = await DashboardService.getDashboardMetrics(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard metrics fetched successfully',
    data: result,
  });
});

export const DashboardController = {
  getDashboardMetrics,
};
