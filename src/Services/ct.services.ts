import { Class_Test } from '@prisma/client'
import prisma from '../shared/prisma'

const createCt = async (data: Class_Test) => {
  const result = await prisma.class_Test.create({ data })
  return result
}
const getCt = async (classTestId: string) => {
  const result = await prisma.class_Test.findUnique({ where: { classTestId } })
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
const evaluateCt = async (
  classTestId: string,
  studentId: string,
  marks: number,
) => {
  const mark = await prisma.mark.upsert({
    where: {
      classTestId_studentId: {
        classTestId,
        studentId,
      },
    },
    update: {
      marks,
    },
    create: {
      classTestId,
      studentId,
      marks,
    },
  })
  return mark
}
const getAllCtResult = async (semesterId: string, studentId: string) => {
  const classTestsWithMarks = await prisma.class_Test.findMany({
    where: {
      AND: [
        { semesterId: semesterId },
        { Mark: { some: { studentId: studentId } } },
      ],
    },
    include: {
      Mark: {
        where: {
          studentId: studentId,
        },
      },
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
