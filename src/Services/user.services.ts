import { Student, Teacher } from '@prisma/client'
import httpStatus from 'http-status'
import prisma from '../Shared/prisma'
import { defaultPageSize, studentSelect, teacherSelect } from '../Shared/utils'
import ApiError from '../errors/ApiError'

const createStudent = async (
  studentId: string,
  name: string,
  email: string,
  batch: string,
  session: string,
  profileImage: string,
  department: string,
  password: string,
) => {
  const student = await prisma.student.create({
    data: {
      studentId,
      name,
      email,
      batch,
      session,
      department,
      profileImage,
      password,
      role: 'student',
    },
    select: studentSelect,
  })
  return student
}
const createTeacher = async (teacherData: Teacher) => {
  const { deptHead } = teacherData
  if (deptHead === true) {
    const existingHead = await prisma.teacher.findFirst({ where: { deptHead } })
    if (existingHead) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'There is a department Head already',
      )
    }
  }
  const teacher = await prisma.teacher.create({
    data: teacherData,
    select: teacherSelect,
  })
  return teacher
}
const updateStudent = async (
  studentId: string,
  studentData: Partial<Student>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...otherData } = studentData
  const existingStudent = await prisma.student.findUnique({
    where: { studentId },
  })
  if (!existingStudent) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Student with this id doesn't exist",
    )
  }
  const updatedStudent = await prisma.student.update({
    where: {
      studentId,
    },
    data: otherData,
    select: studentSelect,
  })
  return updatedStudent
}
const updateTeacher = async (
  teacherId: string,
  teacherData: Partial<Teacher>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, deptHead, ...otherData } = teacherData
  const existingTeacher = await prisma.teacher.findUnique({
    where: { teacherId },
  })
  if (!existingTeacher) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Teacher with this id doesn't exist",
    )
  }
  const updatedTeacher = await prisma.teacher.update({
    where: {
      teacherId,
    },
    data: otherData,
    select: teacherSelect,
  })
  return updatedTeacher
}
const getStudents = async () => {
  const students = await prisma.student.findMany({
    select: studentSelect,
  })
  return students
}
const getTeachers = async (
  page: number = 1,
  pageSize: number = defaultPageSize,
) => {
  const skip = (page - 1) * pageSize
  const take = pageSize
  const teachers = await prisma.teacher.findMany({
    select: teacherSelect,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  })
  return teachers
}
const getSingleStudent = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: { studentId },
    select: studentSelect,
  })
  if (!student) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student with this id does not exist',
    )
  }
  return student
}
const getSingleTeacher = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: { teacherId },
    select: teacherSelect,
  })
  if (!teacher) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Teacher with this id does not exist',
    )
  }
  return teacher
}
const updateStudentPassword = async (
  studentId: string,
  newPassword: string,
) => {
  const updatedUser = await prisma.student.update({
    where: { studentId },
    data: {
      password: newPassword,
    },
    select: studentSelect,
  })
  return updatedUser
}
const updateTeacherPassword = async (
  teacherId: string,
  newPassword: string,
) => {
  const updatedUser = await prisma.teacher.update({
    where: { teacherId },
    data: {
      password: newPassword,
    },
    select: teacherSelect,
  })
  return updatedUser
}
const deleteStudent = async (studentId: string) => {
  const existingStudent = await prisma.student.findUnique({
    where: { studentId },
  })
  if (!existingStudent) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student with this id does not exist',
    )
  }
  const deletedStudent = await prisma.student.delete({
    where: { studentId },
    select: studentSelect,
  })
  return deletedStudent
}
const deleteTeacher = async (teacherId: string) => {
  const existingTeacher = await prisma.teacher.findUnique({
    where: { teacherId },
  })
  if (!existingTeacher) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Teacher with this id does not exist',
    )
  }
  if (existingTeacher.deptHead) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Department Head can not be deleted',
    )
  }
  const deletedTeacher = await prisma.teacher.delete({
    where: { teacherId },
    select: teacherSelect,
  })
  return deletedTeacher
}
const isHead = async (teacherId: string) => {
  const existingTeacher = await prisma.teacher.findUnique({
    where: { teacherId },
  })
  if (!existingTeacher) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Teacher with this id does not exist',
    )
  }
  return existingTeacher.deptHead
}
const makeHead = async (teacherId: string) => {
  const currentHead = await prisma.teacher.findFirst({
    where: { deptHead: true },
  })
  const existingTeacher = await prisma.teacher.findUnique({
    where: { teacherId },
  })
  if (!existingTeacher) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Teacher with this id does not exist',
    )
  }

  const updatedHead = await prisma.$transaction(async tx => {
    const nullifyHead = await tx.teacher.update({
      where: { teacherId: currentHead?.teacherId },
      data: { deptHead: false },
    })
    if (!nullifyHead) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Head creation failed')
    }
    const updatedHead = await tx.teacher.update({
      where: { teacherId },
      data: { deptHead: true },
      select: teacherSelect,
    })
    return updatedHead
  })
  return updatedHead
}
const getStudentsOfBatch = async (batch: string) => {
  const result = await prisma.student.findMany({
    where: { batch },
    select: studentSelect,
  })
  if (!result.length) {
    throw new Error('There is no student in this batch')
  } else {
    return result
  }
}
export const userServices = {
  createStudent,
  createTeacher,
  updateStudent,
  updateTeacher,
  getStudents,
  getTeachers,
  getSingleStudent,
  getSingleTeacher,
  updateStudentPassword,
  updateTeacherPassword,
  deleteStudent,
  deleteTeacher,
  isHead,
  makeHead,
  getStudentsOfBatch,
}
