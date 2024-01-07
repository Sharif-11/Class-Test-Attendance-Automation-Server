import express from 'express'
import { courseControllers } from '../Controllers/course.controllers'
import { courseValidators } from '../Validators/course.validator'
import verifyHead from '../middlewares/verifyHead'
import verifyUser from '../middlewares/verifyUser'
const courseRoutes = express.Router()

courseRoutes.post(
  '/',
  courseValidators.validateCreateCourse,
  //verifyUser('teacher'),
  // verifyHead,
  courseControllers.createCourse,
)
courseRoutes.get(
  '/',
  verifyUser('teacher'),
  verifyHead,
  courseControllers.getAllCourses,
)
courseRoutes.delete(
  '/:courseCode',
  courseValidators.validateDeleteCourse,
  verifyUser('teacher'),
  verifyHead,
  courseControllers.deleteCourse,
)
courseRoutes.patch(
  '/:courseCode',
  courseValidators.validateUpdateCourse,
  verifyUser('teacher'),
  verifyHead,
  courseControllers.updateCourse,
)
courseRoutes.get(
  '/teacher-courses',
  verifyUser('teacher'),
  courseControllers.getCoursesOfTeacher,
)
export default courseRoutes
