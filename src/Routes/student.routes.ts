import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
import { userControllers } from '../Controllers/user.controllers'
import { studentValidators } from '../Validators/student.validators'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const studentRoutes = express.Router()

studentRoutes.post(
  '/signup',
  multerConfig.uploadImage.single('profileImage'),
  studentValidators.validateStudent,
  imageUploader,
  userControllers.createStudent,
)
studentRoutes.post('/login', authControllers.studentLogin)

export default studentRoutes
