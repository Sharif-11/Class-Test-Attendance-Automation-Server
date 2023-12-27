import express from 'express'
import { attendanceController } from '../Controllers/attendance.controllers'
import { attendanceValidators } from '../Validators/attendance.validator'
const attendanceRoutes = express.Router()
attendanceRoutes.post(
  '/',
  attendanceValidators.validateTakeAttendance,
  attendanceController.takeAttendance,
)
attendanceRoutes.get(
  '/calculate-attendance/:studentId',
  attendanceValidators.validateCalculateStudentAttendance,
  attendanceController.calculateStudentAttendance,
)
attendanceRoutes.get(
  '/tabulate-attendance/:courseCode',
  attendanceValidators.validateTabulateStudentAttendance,
  attendanceController.tabulateStudentAttendance,
)
export default attendanceRoutes
