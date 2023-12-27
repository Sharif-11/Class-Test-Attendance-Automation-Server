import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
import { studentValidators } from '../Validators/student.validators'
import { teacherValidators } from '../Validators/teacher.validators'
const authRoutes = express.Router()
authRoutes.post(
  '/student/login',
  studentValidators.validateStudentLogin,
  authControllers.studentLogin,
)
authRoutes.post(
  '/teacher/login',
  teacherValidators.validateTeacherLogin,
  authControllers.teacherLogin,
)
export default authRoutes
