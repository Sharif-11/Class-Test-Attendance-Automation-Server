import express from 'express'
import { userControllers } from '../Controllers/user.controllers'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
const teacherRoutes = express.Router()
teacherRoutes.post(
  '/signup',
  multerConfig.uploadImage.single('profileImage'),
  imageUploader,
  userControllers.createTeacher,
)
teacherRoutes.post('/make-head/:teacherId', userControllers.makeHead)
export default teacherRoutes
