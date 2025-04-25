import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReminderService } from './reminder.service';
import httpStatus from 'http-status';

const createReminder = catchAsync(async (req, res) => {
  const result = await ReminderService.createReminderIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder created successfully',
    data: result,
  });
});

const updateReminder = catchAsync(async (req, res) => {
  const result = await ReminderService.updateReminderIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder updated successfully',
    data: result,
  });
});

const deleteReminder = catchAsync(async (req, res) => {
  const result = await ReminderService.deleteReminderIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder deleted successfully',
    data: result,
  });
});

const upcomingReminderList = catchAsync(async (req, res) => {
  const result = await ReminderService.upcomingReminderList(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming reminders fetched successfully',
    data: result,
  });
});

const reminderList = catchAsync(async (req, res) => {
  const result = await ReminderService.reminderListFromDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder list fetched successfully',
    data: result,
  });
});

const reminderShow = catchAsync(async (req, res) => {
  const result = await ReminderService.reminderShowById(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reminder fetched successfully',
    data: result,
  });
});

export const ReminderController = {
  createReminder,
  updateReminder,
  deleteReminder,
  upcomingReminderList,
  reminderList,
  reminderShow,
};
