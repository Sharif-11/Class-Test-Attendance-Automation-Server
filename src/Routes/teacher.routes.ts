import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
const teacherRoutes = express.Router()
teacherRoutes.post('/signup', userControllers.createTeacher)
teacherRoutes.post('/make-head/:teacherId', userControllers.makeHead)
export default teacherRoutes
