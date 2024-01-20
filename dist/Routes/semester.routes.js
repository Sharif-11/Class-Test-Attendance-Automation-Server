'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const semester_controller_1 = require('../Controllers/semester.controller')
const semester_validator_1 = require('../Validators/semester.validator')
const verifyBatch_1 = __importDefault(require('../middlewares/verifyBatch'))
const verifyHead_1 = __importDefault(require('../middlewares/verifyHead'))
const verifyUser_1 = __importDefault(require('../middlewares/verifyUser'))
const semesterRoutes = express_1.default.Router()
semesterRoutes.post(
  '/',
  semester_validator_1.semesterValidators.validateCreateSemester,
  (0, verifyUser_1.default)('teacher'),
  verifyHead_1.default,
  semester_controller_1.semesterControllers.createSemester,
)
semesterRoutes.delete(
  '/:semesterId',
  semester_validator_1.semesterValidators.validateDeleteSemester,
  (0, verifyUser_1.default)('teacher'),
  verifyHead_1.default,
  semester_controller_1.semesterControllers.deleteSemester,
)
semesterRoutes.get(
  '/',
  (0, verifyUser_1.default)('teacher'),
  verifyHead_1.default,
  semester_controller_1.semesterControllers.getAllSemesters,
)
semesterRoutes.get(
  '/student-semesters',
  (0, verifyUser_1.default)('student'),
  semester_controller_1.semesterControllers.getSemestersOfStudent,
)
semesterRoutes.get(
  '/courses/:semesterId',
  semester_validator_1.semesterValidators.validateGetSemesterCourses,
  (0, verifyUser_1.default)('student'),
  verifyBatch_1.default,
  semester_controller_1.semesterControllers.getSemesterCourses,
)
semesterRoutes.post(
  '/assign-course/:semesterId',
  semester_validator_1.semesterValidators.validateAssignCourse,
  (0, verifyUser_1.default)('teacher'),
  verifyHead_1.default,
  semester_controller_1.semesterControllers.assignCourse,
)
exports.default = semesterRoutes
