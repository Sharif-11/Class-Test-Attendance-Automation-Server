import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
const authRoutes = express.Router()
authRoutes.post('/student/login', authControllers.studentLogin)
authRoutes.post('/teacher/login', authControllers.teacherLogin)
export default authRoutes
