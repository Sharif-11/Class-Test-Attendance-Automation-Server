import { Semester } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { StudentWithoutPassword } from '../Interfaces/user.interface'
import { sendSuccessResponse } from '../Services/response.services'
import { semesterServices } from '../Services/semester.services'
import catchAsync from '../Shared/catchAsync'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { semesterTitle, batch, session } = req.body
  const data = await semesterServices.createSemester(
    semesterTitle,
    batch,
    session,
  )
  sendSuccessResponse<Semester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester created successfully',
    data,
  })
})
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const { page } = req.query
  const data = await semesterServices.getAllSemesters(Number(page))
  sendSuccessResponse<Semester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters found successfully',
    data,
  })
})
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const data = await semesterServices.updateSemester(semesterId, req.body)
  sendSuccessResponse<Semester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters updated successfully',
    data,
  })
})
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const data = await semesterServices.deleteSemester(semesterId)
  sendSuccessResponse<Semester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters deleted successfully',
    data,
  })
})
const getSemestersOfStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.user as StudentWithoutPassword
    const data = await semesterServices.getSemesterOfStudent(studentId)
    sendSuccessResponse<Semester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retreived  successfully',
      data,
    })
  },
)
const getSemesterCourses = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const data = await semesterServices.getSemesterCourses(semesterId)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters of the course retreived successfully',
    data,
  })
})
const assignCourse = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const { teacherId, courseCode } = req.body
  const data = await semesterServices.assignCourse(
    semesterId,
    courseCode,
    teacherId,
  )
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course assigned  successfully',
    data,
  })
})

export const semesterControllers = {
  createSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
  getSemestersOfStudent,
  getSemesterCourses,
  assignCourse,
}
