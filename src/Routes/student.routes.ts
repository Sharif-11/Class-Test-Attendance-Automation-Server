import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
import { userControllers } from '../Controllers/user.controllers'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const studentRoutes = express.Router()

studentRoutes.post(
  '/signup',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userControllers.createStudent,
)
studentRoutes.post('/login', authControllers.studentLogin)

export default studentRoutes
