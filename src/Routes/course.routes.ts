import express from 'express'
import { courseControllers } from '../Controllers/course.controllers'
const courseRoutes = express.Router()
courseRoutes.post('/', courseControllers.createCourse)
courseRoutes.get('/', courseControllers.getAllCourses)
courseRoutes.delete('/:courseCode', courseControllers.deleteCourse)
courseRoutes.patch('/:courseCode', courseControllers.updateCourse)
courseRoutes.get('/teacher/:teacherId', courseControllers.getCoursesOfTeacher)
export default courseRoutes
