import httpStatus from 'http-status'
import { IAttendance } from '../Interfaces/attendance.interface'
import prisma from '../Shared/prisma'
import ApiError from '../errors/ApiError'
import { courseServices } from './courses.services'
import { semesterServices } from './semester.services'
import { userServices } from './user.services'
import { verifyDate } from './utils.services'

const takeAttendance = async (
  semesterId: string,
  courseCode: string,
  date: Date,
  attendances: IAttendance[],
) => {
  const isToday = verifyDate(date)
  if (!isToday) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The given date is incompatible')
  }
  const existingSemester = await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  const existingSemesterCourses = await prisma.semester_Courses.findFirst({
    where: { semesterId, courseCode },
  })
  if (!existingSemesterCourses) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The course does not belongs to this semester',
    )
  }
  const existingAttendance = await prisma.attendance.findFirst({
    where: { semesterId, courseCode, date },
  })

  for (const student of attendances) {
    const { studentId } = student
    const existingStudent = await prisma.student.findUnique({
      where: { studentId },
    })
    if (!existingStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The student does not exist')
    }
    if (existingStudent.batch !== existingSemester.batch) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'The student does not belongs to this semester',
      )
    }
  }
  if (existingAttendance) {
    const result = await prisma.$transaction(async tx => {
      const results = []
      for (const student of attendances) {
        const { studentId, present } = student
        const result = await tx.student_Attendance.upsert({
          where: {
            attendanceId_studentId: {
              attendanceId: existingAttendance.attendanceId,
              studentId,
            },
          },
          create: {
            attendanceId: existingAttendance.attendanceId,
            studentId,
            present,
          },
          update: { studentId, present },
        })
        if (!result) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Attendance taking failed')
        }
        results.push(result)
      }
      return results
    })
    return result
  } else {
    const result = await prisma.$transaction(async tx => {
      const createdAttendance = await tx.attendance.create({
        data: { semesterId, courseCode, date },
      })
      if (!createdAttendance) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Attendance taking failed')
      }
      const attendanceData = []
      for (const student of attendances) {
        const { studentId, present } = student
        attendanceData.push({
          attendanceId: createdAttendance.attendanceId,
          studentId,
          present,
        })
      }
      const createdStudentAttendances = await tx.student_Attendance.createMany({
        data: attendanceData,
      })
      return createdStudentAttendances
    })
    return result
  }
}
const calclateStudentAttendance = async (
  semesterId: string,
  courseCode: string,
  studentId: string,
) => {
  await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  await userServices.getSingleStudent(studentId)
  const existingSemesterCourses = await prisma.semester_Courses.findFirst({
    where: { semesterId, courseCode },
  })
  if (!existingSemesterCourses) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The course does not belongs to this semester',
    )
  }
  const totalClasses = await prisma.attendance.count({
    where: { semesterId, courseCode },
  })
  const totalAttendances = await prisma.student_Attendance.count({
    where: {
      studentId: studentId,
      present: true,
      attendance: {
        semesterId: semesterId,
        courseCode: courseCode,
      },
    },
  })
  return {
    totalAttendances,
    totalClasses,
    attendanceRatio:
      totalClasses > 0 ? (totalAttendances * 100) / totalClasses : null,
  }
}
const tabulateStudentAttendance = async (
  semesterId: string,
  courseCode: string,
) => {
  await semesterServices.getSemester(semesterId)
  await courseServices.getCourse(courseCode)
  const existingSemesterCourses = await prisma.semester_Courses.findFirst({
    where: { semesterId, courseCode },
  })
  if (!existingSemesterCourses) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The course does not belongs to this semester',
    )
  }
  const totalClasses = await prisma.attendance.count({
    where: { semesterId, courseCode },
  })
  const studentTotalAttendance = await prisma.student_Attendance.groupBy({
    by: ['studentId', 'present'],
    _count: {
      present: true,
    },
    where: {
      attendance: {
        semesterId: semesterId,
        courseCode: courseCode,
      },
    },
    having: { present: true },
  })
  return { totalClasses, studentTotalAttendance }
}
export const attendanceServices = {
  takeAttendance,
  calclateStudentAttendance,
  tabulateStudentAttendance,
}
