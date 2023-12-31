import { Student, Teacher } from '@prisma/client'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace Express {
    interface Request {
      user: Omit<Student, 'password'> | Omit<Teacher, 'password'>
    }
  }
}
