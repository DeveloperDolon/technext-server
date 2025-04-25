import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { InteractionService } from './interaction.service';

const createInteraction = catchAsync(async (req, res) => {
  const result = await InteractionService.createInteractionIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interaction created successfully',
    data: result,
  });
});

const updateInteraction = catchAsync(async (req, res) => {
  const result = await InteractionService.updateInteractionIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interaction updated successfully',
    data: result,
  });
});

const deleteInteraction = catchAsync(async (req, res) => {
  const result = await InteractionService.deleteInteractionIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interaction deleted successfully',
    data: result,
  });
});

const interactionList = catchAsync(async (req, res) => {
  const result = await InteractionService.interactionListFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interaction list fetched successfully',
    data: result,
  });
});

const interactionShow = catchAsync(async (req, res) => {
  const result = await InteractionService.interactionShowFromDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interaction fetched successfully',
    data: result,
  });
});

export const InteractionController = {
  createInteraction,
  updateInteraction,
  deleteInteraction,
  interactionList,
  interactionShow,
};
