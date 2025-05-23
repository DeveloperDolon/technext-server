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

const updateClient = catchAsync(async (req, res) => {
  const result = await ClientService.updateClientIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client updated successfully',
    data: result,
  });
});

const deleteClient = catchAsync(async (req, res) => {
  const result = await ClientService.deleteClientIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client deleted successfully',
    data: result,
  });
});

const clientList = catchAsync(async (req, res) => {
  const result = await ClientService.clientListFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client list fetched successfully',
    data: result,
  });
});

const clientShow = catchAsync(async (req, res) => {
  const result = await ClientService.clientShowById(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client list fetched successfully',
    data: result,
  });
});

export const ClientController = {
  createClient,
  updateClient,
  deleteClient,
  clientList,
  clientShow,
};
