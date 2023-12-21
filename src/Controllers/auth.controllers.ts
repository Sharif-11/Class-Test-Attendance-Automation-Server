import { Student, Teacher } from '@prisma/client'
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { authServices } from '../Services/auth.services'
import { sendSuccessResponse } from '../Services/response.services'
import { generateToken } from '../Services/utils.services'
import catchAsync from '../Shared/catchAsync'

const studentLogin: RequestHandler = catchAsync(async (req, res) => {
  const { studentId, password } = req.body
  const student = await authServices.studentLogin(studentId, password)
  sendSuccessResponse<Omit<Student, 'password'> & { token: string }>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student logged in successfully',
    data: { ...student, token: generateToken(studentId, 'student') },
  })
})
const teacherLogin: RequestHandler = catchAsync(async (req, res) => {
  const { teacherId, password } = req.body
  const teacher = await authServices.teacherLogin(teacherId, password)
  sendSuccessResponse<Omit<Teacher, 'password'> & { token: string }>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher logged in successfully',
    data: { ...teacher, token: generateToken(teacherId, 'teacher') },
  })
})
export const authControllers = { studentLogin, teacherLogin }
