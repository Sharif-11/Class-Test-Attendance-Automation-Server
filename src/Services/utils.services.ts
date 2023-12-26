import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
