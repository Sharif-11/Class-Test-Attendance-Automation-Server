import express from 'express'
import { semesterControllers } from '../Controllers/semester.controller'
import { semesterValidators } from '../Validators/semester.validator'
import verifyBatch from '../middlewares/verifyBatch'
import verifyHead from '../middlewares/verifyHead'
import verifyUser from '../middlewares/verifyUser'
const semesterRoutes = express.Router()
semesterRoutes.post(
  '/',
  semesterValidators.validateCreateSemester,
  verifyUser('teacher'),
  verifyHead,
  semesterControllers.createSemester,
)
semesterRoutes.delete(
  '/:semesterId',
  semesterValidators.validateDeleteSemester,
  verifyUser('teacher'),
  verifyHead,
  semesterControllers.deleteSemester,
)
semesterRoutes.get(
  '/',
  verifyUser('teacher'),
  verifyHead,
  semesterControllers.getAllSemesters,
)
semesterRoutes.get(
  '/student-semesters',
  verifyUser('student'),
  semesterControllers.getSemestersOfStudent,
)
semesterRoutes.get(
  '/courses/:semesterId',
  semesterValidators.validateGetSemesterCourses,
  verifyUser('student'),
  verifyBatch,
  semesterControllers.getSemesterCourses,
)
semesterRoutes.post(
  '/assign-course/:semesterId',
  semesterValidators.validateAssignCourse,
  verifyUser('teacher'),
  verifyHead,
  semesterControllers.assignCourse,
)

export default semesterRoutes
