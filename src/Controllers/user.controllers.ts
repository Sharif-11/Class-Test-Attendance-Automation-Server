import { Student, Teacher } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../Services/response.services'
import { userServices } from '../Services/user.services'
import { hashPassword } from '../Services/utils.services'
import catchAsync from '../Shared/catchAsync'

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const { password, deptHead = false, ...others } = req.body
  console.log(others)
  const result = await userServices.createTeacher({
    ...others,
    password: hashPassword(password),
    role: 'teacher',
    deptHead: Boolean(deptHead),
  })
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher created successfully',
    data: result,
  })
})
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, ...others } = req.body
  console.log(others)
  const result = await userServices.createStudent({
    ...others,
    password: hashPassword(password),
    role: 'student',
  })

  sendSuccessResponse<Omit<Student, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student created successfully',
  })
})
const makeHead = catchAsync(async (req: Request, res: Response) => {
  const { teacherId } = req.params
  const result = await userServices.makeHead(teacherId)
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const userControllers = { createTeacher, createStudent, makeHead }
