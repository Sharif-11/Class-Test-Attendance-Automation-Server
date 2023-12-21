import express from 'express'
import { semesterControllers } from '../Controllers/semester.controller'
const semesterRoutes = express.Router()
semesterRoutes.post('/', semesterControllers.createSemester)
semesterRoutes.delete('/:semesterId', semesterControllers.deleteSemester)
semesterRoutes.get('/', semesterControllers.getAllSemesters)
semesterRoutes.get(
  '/student/:studentId',
  semesterControllers.getSemestersOfStudent,
)
semesterRoutes.get(
  '/courses/:semesterId',
  semesterControllers.getSemesterCourses,
)
semesterRoutes.post(
  '/assign-course/:semesterId',
  semesterControllers.assignCourse,
)
export default semesterRoutes
