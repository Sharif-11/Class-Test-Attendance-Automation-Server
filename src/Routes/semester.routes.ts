import express from 'express'
import { semesterControllers } from '../Controllers/semester.controller'
import { semesterValidators } from '../Validators/semester.validator'
const semesterRoutes = express.Router()
semesterRoutes.post(
  '/',
  semesterValidators.validateCreateSemester,
  semesterControllers.createSemester,
)
semesterRoutes.delete(
  '/:semesterId',
  semesterValidators.validateDeleteSemester,
  semesterControllers.deleteSemester,
)
semesterRoutes.get('/', semesterControllers.getAllSemesters)
semesterRoutes.get(
  '/student/:studentId',
  semesterValidators.validateGetSemestersOfStudent,
  semesterControllers.getSemestersOfStudent,
)
semesterRoutes.get(
  '/courses/:semesterId',
  semesterValidators.validateGetSemesterCourses,
  semesterControllers.getSemesterCourses,
)
semesterRoutes.post(
  '/assign-course/:semesterId',
  semesterValidators.validateAssignCourse,
  semesterControllers.assignCourse,
)

export default semesterRoutes
