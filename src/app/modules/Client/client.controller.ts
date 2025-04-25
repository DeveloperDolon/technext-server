import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClientService } from './client.service';

const createClient = catchAsync(async (req, res) => {
  const result = await ClientService.clientCreateIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client created successfully',
    data: result,
  });
});

export const ClientController = {
  createClient,
};
