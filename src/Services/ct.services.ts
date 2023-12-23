import { Class_Test } from '@prisma/client'
import httpStatus from 'http-status'
import { ExcelMark } from '../Interfaces/ClassTestMarks.interface'
import prisma from '../Shared/prisma'
import ApiError from '../errors/ApiError'
import { courseServices } from './courses.services'
import { semesterServices } from './semester.services'
import { userServices } from './user.services'

const createCt = async (data: Class_Test) => {
  const result = await prisma.class_Test.create({ data })
  return result
}
const getCt = async (classTestId: string) => {
  const result = await prisma.class_Test.findUnique({ where: { classTestId } })
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Class test with this id does not exist',
    )
  }
  return result
}
const getAllCt = async (semesterId: string, courseCode: string) => {
  const result = await prisma.class_Test.findMany({
    where: { semesterId, courseCode },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return result
}
const updateCt = async (classTestId: string, data: Partial<Class_Test>) => {
  const result = await prisma.class_Test.update({
    where: { classTestId },
    data,
  })
  return result
}
const deleteCt = async (classTestId: string) => {
  const result = await prisma.class_Test.delete({ where: { classTestId } })
  return result
}
const evaluateCt = async (classTestId: string, marksData: ExcelMark[]) => {
  const existingCt = await getCt(classTestId)
  const { semesterId, courseCode, full_mark } = existingCt
  const existingSemester = await semesterServices.getSemester(semesterId)
  for (const markData of marksData) {
    const { studentId, marks } = markData
    const existingStudent = await userServices.getSingleStudent(
      String(studentId),
    )
    if (!existingStudent) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Student with those id does not exist',
      )
    }
    if (existingSemester.batch !== existingStudent.batch) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'The students does not belongs to the semester',
      )
    }
    if (Number(marks) > full_mark) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'marks can not be greater than full marks',
      )
    }
  }
  const totalStudent = await prisma.student.findMany({
    where: { batch: existingSemester.batch },
  })
  const data: {
    semesterId: string
    courseCode: string
    classTestId: string
    studentId: string
    marks: number
  }[] = []
  for (const markData of marksData) {
    data.push({
      semesterId,
      courseCode,
      classTestId,
      studentId: String(markData.studentId),
      marks: Number(markData.marks),
    })
  }
  if (totalStudent.length !== data.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The all students of the semester should be added',
    )
  }
  const transactionResult = await prisma.$transaction(async tx => {
    const currentStatus = await tx.class_Test.findFirst({
      where: { classTestId },
    })
    const updateCtStatus = await tx.class_Test.update({
      where: { classTestId },
      data: { evaluated: true },
    })
    if (!updateCtStatus) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'evaluation of class test failed',
      )
    }
    if (currentStatus?.evaluated === true) {
      const deleteAllResult = await tx.mark.deleteMany({
        where: { classTestId },
      })
      if (!deleteAllResult) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'evaluation of class test failed',
        )
      }
    }
    const result = await tx.mark.createMany({ data })
    return result
  })
  return transactionResult
}
const getAllCtResult = async (
  semesterId: string,
  courseCode: string,
  studentId: string,
) => {
  await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  const classTestsWithMarks = await prisma.class_Test.findMany({
    where: {
      AND: [
        { semesterId, courseCode },
        { Mark: { some: { studentId: studentId } } },
      ],
    },
    include: {
      Mark: {
        where: {
          studentId: studentId,
        },
      },
      course: { select: { courseTitle: true, credit: true } },
      semester: { select: { semesterTitle: true } },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return classTestsWithMarks
}
export const classTestServices = {
  createCt,
  getCt,
  getAllCt,
  updateCt,
  deleteCt,
  evaluateCt,
  getAllCtResult,
}
