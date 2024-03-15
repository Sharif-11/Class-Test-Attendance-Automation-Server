import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
import { userControllers } from '../Controllers/user.controllers'
import { teacherValidators } from '../Validators/teacher.validators'
import { multerConfig } from '../config/multer'
import imageUploader from '../middlewares/imageUploade.middleware'
import verifyHead from '../middlewares/verifyHead'
import verifyUser from '../middlewares/verifyUser'
const teacherRoutes = express.Router()
teacherRoutes.delete(
  '/:teacherId',
  // verifyUser('teacher'),
  // verifyHead,
  userControllers.deleteTeacher,
)
teacherRoutes.get(
  '/',
  //verifyUser('teacher'),
  //verifyHead,
  userControllers.getTeachers,
)
teacherRoutes.post(
  '/signup',
  multerConfig.uploadImage.single('profileImage'),
  teacherValidators.validateTeacher,
  imageUploader,
  userControllers.createTeacher,
)
teacherRoutes.post(
  '/login',
  teacherValidators.validateTeacherLogin,
  authControllers.teacherLogin,
)
teacherRoutes.post(
  '/make-head/:teacherId',
  teacherValidators.validateHead,
  verifyUser('teacher'),
  verifyHead,
  userControllers.makeHead,
)
export default teacherRoutes
