import express from 'express'
import { attendanceController } from '../Controllers/attendance.controllers'
import { attendanceValidators } from '../Validators/attendance.validator'
import verifyBatch from '../middlewares/verifyBatch'
import verifyInstructor from '../middlewares/verifyInstructor'
import verifyUser from '../middlewares/verifyUser'
const attendanceRoutes = express.Router()
attendanceRoutes.post(
  '/',
  // attendanceValidators.validateTakeAttendance,
  // verifyUser('teacher'),
  // verifyInstructor,
  attendanceController.takeAttendance,
)
attendanceRoutes.get('/', attendanceController.getAttendance)
attendanceRoutes.get(
  '/calculate-attendance',
  attendanceValidators.validateCalculateStudentAttendance,
  verifyUser('student'),
  verifyBatch,
  attendanceController.calculateStudentAttendance,
)
attendanceRoutes.get(
  '/tabulate-attendance/:courseCode',
  attendanceValidators.validateTabulateStudentAttendance,
  verifyUser('teacher'),
  verifyInstructor,
  attendanceController.tabulateStudentAttendance,
)
export default attendanceRoutes
