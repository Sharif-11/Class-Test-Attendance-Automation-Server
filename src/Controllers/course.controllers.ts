import { Course } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { courseServices } from '../Services/courses.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const data = await courseServices.createCourse(req.body)
  sendSuccessResponse<Course>(res, {
    statusCode: httpStatus.OK,
    message: 'Course created successfully',
    success: true,
    data,
  })
})
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseCode } = req.params
  const data = await courseServices.deleteCourse(courseCode)
  sendSuccessResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data,
  })
})
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseCode } = req.params
  console.log(courseCode)
  const data = await courseServices.updateCourse(courseCode, req.body)
  console.log(data)
  sendSuccessResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data,
  })
})
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const data = await courseServices.getAllCourse()
  sendSuccessResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses found successfully',
    data,
  })
})
export const courseControllers = {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
}
