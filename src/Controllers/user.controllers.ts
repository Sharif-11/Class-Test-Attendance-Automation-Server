import { Student, Teacher } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../Services/response.services'
import { userServices } from '../Services/user.services'
import catchAsync from '../Shared/catchAsync'

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createTeacher(req.body)
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createStudent(req.body)
  sendSuccessResponse<Omit<Student, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const makeHead = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.makeHead(req.body.teacherId)
  sendSuccessResponse<Omit<Teacher, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const userControllers = { createTeacher, createStudent, makeHead }
