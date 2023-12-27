import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
import validateTeacher from '../Validators/teacher.validators'
import imageUploader from '../middlewares/imageUploade.middleware'
const teacherRoutes = express.Router()
teacherRoutes.post(
  '/signup',
  validateTeacher,
  imageUploader,
  userControllers.createTeacher,
)
teacherRoutes.post('/make-head/:teacherId', userControllers.makeHead)
export default teacherRoutes
