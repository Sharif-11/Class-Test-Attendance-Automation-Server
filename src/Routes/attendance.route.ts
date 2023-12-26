import express from 'express'
import { attendanceController } from '../Controllers/attendance.controllers'
const attendanceRoutes = express.Router()
attendanceRoutes.post('/', attendanceController.takeAttendance)
export default attendanceRoutes
