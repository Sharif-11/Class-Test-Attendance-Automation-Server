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
const calculateStudentAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId, courseCode } = req.body
    const { studentId } = req.params
    const data = await attendanceServices.calclateStudentAttendance(
      semesterId,
      courseCode,
      studentId,
    )
    sendSuccessResponse<typeof data>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendances of a student calculated successfully',
      data,
    })
  },
)
const tabulateStudentAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const { courseCode } = req.params
    const { semesterId } = req.body
    const data = await attendanceServices.tabulateStudentAttendance(
      semesterId,
      courseCode,
    )
    sendSuccessResponse<typeof data>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendance of a course tabulated successfully',
      data,
    })
  },
)
export const attendanceController = {
  takeAttendance,
  calculateStudentAttendance,
  tabulateStudentAttendance,
}
