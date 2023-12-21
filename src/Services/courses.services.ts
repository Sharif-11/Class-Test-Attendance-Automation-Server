import { Course } from '@prisma/client'
import prisma from '../Shared/prisma'

const createCourse = async (courseData: Course) => {
  const course = await prisma.course.create({ data: courseData })
  return course
}
const getCourse = async (courseCode: string) => {
  const course = await prisma.course.findUnique({ where: { courseCode } })
  if (!course) {
    throw new Error('Course with this id does not exist')
  }
  return course
}
const getAllCourse = async () => await prisma.course.findMany({})
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
export const courseServices = {
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
  getAllCourse,
}
