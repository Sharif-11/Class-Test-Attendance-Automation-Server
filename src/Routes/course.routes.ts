import express from 'express'
import { courseControllers } from '../Controllers/course.controllers'
import { courseValidators } from '../Validators/course.validator'
const courseRoutes = express.Router()
courseRoutes.post(
  '/',
  courseValidators.validateCreateCourse,
  courseControllers.createCourse,
)
courseRoutes.get('/', courseControllers.getAllCourses)
courseRoutes.delete(
  '/:courseCode',
  courseValidators.validateDeleteCourse,
  courseControllers.deleteCourse,
)
courseRoutes.patch(
  '/:courseCode',
  courseValidators.validateUpdateCourse,
  courseControllers.updateCourse,
)
courseRoutes.get(
  '/teacher/:teacherId',
  courseValidators.validateGetCoursesOfTeacher,
  courseControllers.getCoursesOfTeacher,
)
export default courseRoutes
