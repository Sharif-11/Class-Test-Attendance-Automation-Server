import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateTakeAttendance = [
  body('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),

  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format. Should be in ISO8601 format'),

  body('attendances')
    .isArray()
    .withMessage('Attendances must be an array')
    .notEmpty()
    .withMessage('Attendances array must not be empty'),
  body('attendances.*.studentId')
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),

  body('attendances.*.present')
    .isBoolean()
    .withMessage('Present must be a boolean'),
  validationErrorHandler('Attendace validation failed'),
]
const validateCalculateStudentAttendance = [
  body('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),
  body('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  param('studentId')
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),
  validationErrorHandler('Attendance validation failed'),
]
const validateTabulateStudentAttendance = [
  body('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),
  param('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  validationErrorHandler('Tabulating attendance validation failed'),
]
export const attendanceValidators = {
  validateTakeAttendance,
  validateCalculateStudentAttendance,
  validateTabulateStudentAttendance,
}
