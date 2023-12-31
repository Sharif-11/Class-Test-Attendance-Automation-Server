import { Student, Teacher } from '@prisma/client'

export type StudentWithoutPassword = Omit<Student, 'password'>
export type TeacherWithoutPassword = Omit<Teacher, 'password'>
