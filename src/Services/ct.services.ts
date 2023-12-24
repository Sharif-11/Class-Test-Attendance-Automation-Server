import { Class_Test } from '@prisma/client'
import httpStatus from 'http-status'
import { ExcelMark } from '../Interfaces/ClassTestMarks.interface'
import prisma from '../Shared/prisma'
import ApiError from '../errors/ApiError'
import { courseServices } from './courses.services'
import { semesterServices } from './semester.services'
import { userServices } from './user.services'

const createCt = async (
  semesterId: string,
  courseCode: string,
  full_mark: number,
) => {
  await semesterServices.getSemester(semesterId)
  const existingCourse = await courseServices.getCourse(courseCode)
  const existingSemesterCourse = await prisma.semester_Courses.findFirst({
    where: { semesterId, courseCode },
  })
  if (!existingSemesterCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Course is not assigned to the semester',
    )
  }
  const ctCount = await prisma.class_Test.findMany({
    where: { semesterId, courseCode },
  })
  if (ctCount?.length >= existingCourse.credit + 1) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are trying to create too many class test for a course',
    )
  }
  const result = await prisma.class_Test.create({
    data: { semesterId, courseCode, full_mark },
  })
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
  await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)

  const result = await prisma.class_Test.findMany({
    where: { semesterId, courseCode },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return result
}
const getCtResultForTeacher = async (classTestId: string) => {
  const existingCt = await getCt(classTestId)
  if (existingCt.evaluated === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This ct is not evaluated yet')
  }
  const result = await prisma.mark.findMany({
    where: {
      classTestId,
    },
    select: {
      studentId: true,
      marks: true,
    },
    orderBy: {
      studentId: 'asc',
    },
  })
  return result
}
const updateCt = async (classTestId: string, data: Partial<Class_Test>) => {
  await getCt(classTestId)
  const result = await prisma.class_Test.update({
    where: { classTestId },
    data,
  })
  return result
}
const deleteCt = async (classTestId: string) => {
  await getCt(classTestId)
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
    if (Number(marks) < 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Marks can not be negative')
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
  const existingSemester = await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  const existingStudent = await userServices.getSingleStudent(studentId)
  const existingSemesterCourse = await prisma.semester_Courses.findFirst({
    where: { semesterId, courseCode },
  })
  if (existingStudent.batch !== existingSemester.batch) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The student does not belongs to this course',
    )
  }
  if (!existingSemesterCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The course are not assigned to this semester',
    )
  }
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
  getCtResultForTeacher,
}
