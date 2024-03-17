import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../Shared/prisma'
import { semesterTitles } from '../Shared/utils'
import config from '../config'
export const createSemesterId = (
  semesterTitle: keyof typeof semesterTitles,
  batch: string,
) => {
  if (semesterTitles[semesterTitle]) {
    return batch + semesterTitles[semesterTitle]
  } else {
    throw new Error('Invalid semester title or batch')
  }
}
export const hashPassword = (password: string): string => {
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(config.saltRounds as string),
  )
  return hashedPassword
}

export const comparePasswords = (
  password: string,
  hashedPassword: string,
): boolean => {
  const match = bcrypt.compareSync(password, hashedPassword)
  return match
}
export const generateToken = (id: string, role: 'teacher' | 'student') => {
  const token = jwt.sign({ id, role }, config.jwtSecret as string, {
    expiresIn: '1y',
  })
  return token
}
export const verifyDate = (date: Date) => {
  const today = new Date()
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  )
}
export const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Adding leading zero if necessary
  const day = ('0' + date.getDate()).slice(-2) // Adding leading zero if necessary
  return `${year}-${month}-${day}`
}
export const extractBatch = (semesterId: string): string => {
  if (semesterId.length < 4) {
    return semesterId
  } else {
    return semesterId.substring(0, 4)
  }
}
export const nullifyTables = async () => {
  // Delete all rows from Student_Attendance model
  await prisma.student_Attendance.deleteMany()

  // Delete all rows from Mark model
  await prisma.mark.deleteMany()

  // Delete all rows from Class_Test model
  await prisma.class_Test.deleteMany()

  // Delete all rows from Attendance model
  await prisma.attendance.deleteMany()

  // Delete all rows from Semester_Courses model
  await prisma.semester_Courses.deleteMany()

  // Delete all rows from Student model
  await prisma.student.deleteMany()

  // Delete all rows from Teacher model
  await prisma.teacher.deleteMany()

  // Delete all rows from Course model
  await prisma.course.deleteMany()

  // Delete all rows from Semester model
  await prisma.semester.deleteMany()
}
