import { Course } from '@prisma/client'
import prisma from '../Shared/prisma'
import { defaultPageSize } from '../Shared/utils'
import { userServices } from './user.services'

const createCourse = async (
  courseCode: string,
  courseTitle: string,
  credit: number,
) => {
  const course = await prisma.course.create({
    data: { courseCode, courseTitle, credit },
  })
  return course
}
const getCourse = async (courseCode: string) => {
  const course = await prisma.course.findUnique({ where: { courseCode } })
  if (!course) {
    throw new Error('Course with this id does not exist')
  }
  return course
}
const getAllCourse = async (
  page: number = 1,
  pageSize: number = defaultPageSize,
) => {
  const skip = (page - 1) * pageSize
  const take = pageSize
  return await prisma.course.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  })
}
const updateCourse = async (
  courseCode: string,
  courseData: Partial<Course>,
) => {
  await getCourse(courseCode)
  const result = await prisma.course.update({
    where: { courseCode },
    data: courseData,
  })
  return result
}
const deleteCourse = async (courseCode: string) => {
  await getCourse(courseCode)
  const result = await prisma.course.delete({ where: { courseCode } })
  return result
}

const getCoursesOfTeacher = async (teacherId: string) => {
  await userServices.getSingleTeacher(teacherId)
  const result = await prisma.semester_Courses.findMany({
    where: { teacherId },
    include: {
      semester: {
        select: {
          semesterTitle: true,
          batch: true,
          session: true,
        },
      },
      course: {
        select: {
          courseTitle: true,
          credit: true,
        },
      },
    },
    orderBy: {
      course: {
        createdAt: 'desc',
      },
    },
  })
  return result
}

export const courseServices = {
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
  getAllCourse,
  getCoursesOfTeacher,
}
