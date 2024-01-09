import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateTakeAttendance = [
  body('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('semesterId')
    .trim()
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),

  body('date')
    .trim()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format. Should be in ISO8601 format'),

  body('attendances')
    .trim()
    .isArray()
    .withMessage('Attendances must be an array')
    .notEmpty()
    .withMessage('Attendances array must not be empty'),
  body('attendances.*.studentId')
    .trim()
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),

  body('attendances.*.present')
    .trim()
    .isBoolean()
    .withMessage('Present must be a boolean'),
  validationErrorHandler('Attendace validation failed'),
]
const validateCalculateStudentAttendance = [
  body('semesterId')
    .trim()
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),
  body('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  validationErrorHandler('Attendance validation failed'),
]
const validateTabulateStudentAttendance = [
  body('semesterId')
    .trim()
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters')
    .isNumeric()
    .withMessage('semesterId must be numeric'),
  param('courseCode')
    .trim()
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
