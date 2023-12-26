import express from 'express'
import { attendanceController } from '../Controllers/attendance.controllers'
const attendanceRoutes = express.Router()
attendanceRoutes.post('/', attendanceController.takeAttendance)
attendanceRoutes.get(
  '/calculate-attendance/:studentId',
  attendanceController.calculateStudentAttendance,
)
attendanceRoutes.get(
  '/tabulate-attendance/:courseCode',
  attendanceController.tabulateStudentAttendance,
)
export default attendanceRoutes
