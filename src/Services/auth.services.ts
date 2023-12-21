import httpStatus from 'http-status'
import prisma from '../Shared/prisma'
import ApiError from '../errors/ApiError'
import { comparePasswords } from './utils.services'

const studentLogin = async (studentId: string, password: string) => {
  const existingStudent = await prisma.student.findUnique({
    where: { studentId },
  })

  if (
    !existingStudent ||
    !comparePasswords(password, existingStudent.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: currentPassword, ...otherData } = existingStudent
  return otherData
}
const teacherLogin = async (teacherId: string, password: string) => {
  const existingTeacher = await prisma.teacher.findUnique({
    where: { teacherId },
  })
  if (
    !existingTeacher ||
    comparePasswords(password, existingTeacher.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: currentPassword, ...otherData } = existingTeacher
  return otherData
}
export const authServices = { studentLogin, teacherLogin }
