import { Semester } from '@prisma/client'
import prisma from '../Shared/prisma'
import { semesterTitles } from '../Shared/utils'
import { courseServices } from './courses.services'
import { userServices } from './user.services'
import { createSemesterId } from './utils.services'

const createSemester = async (
  semesterTitle: keyof typeof semesterTitles,
  batch: string,
) => {
  const semesterId = createSemesterId(semesterTitle, batch)
  const semester = await prisma.semester.create({
    data: { semesterTitle, batch, semesterId },
  })
  return semester
}
const getSemester = async (semesterId: string) => {
  const result = await prisma.semester.findUnique({ where: { semesterId } })
  if (!result) {
    throw new Error('Semester with this id doesn not exist')
  }
  return result
}
const getAllSemesters = async () => await prisma.semester.findMany()
const updateSemester = async (
  semesterId: string,
  semesterData: Partial<Semester>,
) => {
  await getSemester(semesterId)
  const result = await prisma.semester.update({
    where: { semesterId },
    data: semesterData,
  })
  return result
}
const deleteSemester = async (semesterId: string) => {
  await getSemester(semesterId)
  const result = await prisma.semester.delete({ where: { semesterId } })
  return result
}
const assignCourse = async (
  semesterId: string,
  courseCode: string,
  teacherId: string,
) => {
  await userServices.getSingleTeacher(teacherId)
  await courseServices.getCourse(courseCode)
  await getSemester(semesterId)
  const assignedCourse = await prisma.semester_Courses.create({
    data: {
      semesterId,
      courseCode,
      teacherId,
    },
    include: {
      semester: {
        select: { semesterTitle: true, batch: true },
      },
      course: { select: { courseCode: true, courseTitle: true, credit: true } },
      teacher: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
  return assignedCourse
}
const getSemesterCourses = async (semesterId: string) => {
  await getSemester(semesterId)
  const result = await prisma.semester.findUnique({
    where: { semesterId },
    select: {
      semesterTitle: true,
      batch: true,
      Semester_Courses: {
        select: {
          course: {
            select: {
              courseCode: true,
              courseTitle: true,
              credit: true,
            },
          },
        },
      },
      // Add other fields you want to include
    },
  })
  return result
}
const unassignCourse = async (
  semesterId: string,
  courseCode: string,
  teacherId: string,
) => {
  await getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  await userServices.getSingleTeacher(teacherId)
  const result = await prisma.semester_Courses.delete({
    where: {
      semesterId_courseCode_teacherId: { semesterId, courseCode, teacherId },
    },
  })
  return result
}
export const semesterServices = {
  createSemester,
  getSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
  assignCourse,
  getSemesterCourses,
  unassignCourse,
}
