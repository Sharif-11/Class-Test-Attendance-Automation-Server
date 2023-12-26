import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { attendanceServices } from '../Services/attendance.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'

const takeAttendance = catchAsync(async (req: Request, res: Response) => {
  const { courseCode, semesterId, date, attendances } = req.body
  const data = await attendanceServices.takeAttendance(
    semesterId,
    courseCode,
    new Date(date),
    attendances,
  )
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance is taken successfully',
    data,
  })
})
export const attendanceController = { takeAttendance }
