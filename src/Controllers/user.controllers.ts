import { Student, Teacher } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../Services/response.services'
import { userServices } from '../Services/user.services'
import { hashPassword } from '../Services/utils.services'
import catchAsync from '../Shared/catchAsync'

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const { password, deptHead = 'false', ...others } = req.body
  const result = await userServices.createTeacher({
    ...others,
    password: hashPassword(password),
    role: 'teacher',
    deptHead: (deptHead as string).toLowerCase() === 'true',
  })
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher created successfully',
    data: result,
  })
})
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const {
    password,
    studentId,
    name,
    email,
    batch,
    session,
    department,
    profileImage,
  } = req.body

  const result = await userServices.createStudent(
    studentId,
    name,
    email,
    batch,
    session,
    profileImage,
    department,
    hashPassword(password),
  )

  sendSuccessResponse<Omit<Student, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student created successfully',
  })
})
const getTeachers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1 } = req.query
  const result = await userServices.getTeachers(Number(page))

  sendSuccessResponse<typeof result>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Teachers retreived successfully',
  })
})
const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { teacherId } = req.params
  const result = await userServices.deleteTeacher(teacherId)

  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Teacher deleted successfully',
  })
})
const makeHead = catchAsync(async (req: Request, res: Response) => {
  const { teacherId } = req.params
  const result = await userServices.makeHead(teacherId)
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Head is assigned successfully',
  })
})
const getStudentsOfBatch = catchAsync(async (req: Request, res: Response) => {
  const { batch } = req.params
  const { page } = req.query
  const result = await userServices.getStudentsOfBatch(
    batch,
    isNaN(Number(page)) ? 1 : Number(page),
  )
  sendSuccessResponse<typeof result>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: `Students of batch ${batch} retreived successfully`,
  })
})
export const userControllers = {
  createTeacher,
  createStudent,
  makeHead,
  deleteTeacher,
  getTeachers,
  getStudentsOfBatch,
}
