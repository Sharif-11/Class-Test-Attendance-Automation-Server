import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

// Validation for createSemester controller
const validateCreateSemester = [
  body('semesterTitle')
    .isString()
    .withMessage('Semester title must be a string')
    .matches(/^(Level-[1-4] Term-[1-2])$/)
    .withMessage('Invalid semester title format'),

  body('batch')
    .isString()
    .withMessage('Batch must be a string')
    .isLength({ min: 4, max: 4 })
    .withMessage('Batch must be 4 digits')
    .isNumeric()
    .withMessage('Batch must be numeric'),

  body('session')
    .isString()
    .withMessage('Session must be a string')
    .matches(/^\d{4}-\d{4}$/)
    .withMessage(
      'Invalid session format, it should be in the form of YYYY-YYYY',
    )
    .custom((value: string) => {
      const years = value.split('-').map(e => Number(e))
      return years[1] - years[0] === 1
    })
    .withMessage('Year must be consecutive'),
  validationErrorHandler,
]

// Validation for updateSemester controller
const validateUpdateSemester = [
  param('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('Semester ID must contain only digits'),

  body('semesterTitle')
    .optional()
    .isString()
    .withMessage('Semester title must be a string')
    .matches(/^(Level-[1-4] Term-[1-2])$/)
    .withMessage('Invalid semester title format'),

  body('batch')
    .optional()
    .isString()
    .withMessage('Batch must be a string')
    .isLength({ min: 4, max: 4 })
    .withMessage('Batch must be 4 digits')
    .isNumeric()
    .withMessage('Batch must be numeric'),
  body('session')
    .optional()
    .isString()
    .withMessage('Session must be a string')
    .matches(/^\d{4}-\d{4}$/)
    .withMessage(
      'Invalid session format, it should be in the form of YYYY-YYYY',
    )
    .custom((value: string) => {
      const years = value.split('-').map(e => Number(e))
      return years[1] - years[0] === 1
    })
    .withMessage('Year must be consecutive'),
  validationErrorHandler,
]

// Validation for deleteSemester controller
const validateDeleteSemester = [
  param('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('Semester ID must contain only digits'),
  validationErrorHandler,
]

// Validation for getSemestersOfStudent controller
const validateGetSemestersOfStudent = [
  param('studentId')
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),
  validationErrorHandler,
]

// Validation for getSemesterCourses controller
const validateGetSemesterCourses = [
  param('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('Semester ID must contain only digits'),
  validationErrorHandler,
]

// Validation for assignCourse controller
const validateAssignCourse = [
  param('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('Semester ID must contain only digits'),

  body('teacherId')
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),

  body('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format'),
  validationErrorHandler,
]
export const semesterValidators = {
  validateCreateSemester,
  validateDeleteSemester,
  validateAssignCourse,
  validateGetSemesterCourses,
  validateGetSemestersOfStudent,
  validateUpdateSemester,
}
