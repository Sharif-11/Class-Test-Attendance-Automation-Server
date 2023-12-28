import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

// Validation for createCourse controller
const validateCreateCourse = [
  body('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('courseTitle')
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),

  body('credit')
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  validationErrorHandler('Course validation failed'),
]

// Validation for deleteCourse controller
const validateDeleteCourse = [
  param('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  validationErrorHandler('Course validation failed'),
]

// Validation for updateCourse controller
export const validateUpdateCourse = [
  param('courseCode')
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('courseTitle')
    .optional()
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),

  body('credit')
    .optional()
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  validationErrorHandler('Course validation failed'),
]

// Validation for getCoursesOfTeacher controller
const validateGetCoursesOfTeacher = [
  param('teacherId')
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),
  validationErrorHandler('Teacher validation failed'),
]
export const courseValidators = {
  validateCreateCourse,
  validateDeleteCourse,
  validateGetCoursesOfTeacher,
  validateUpdateCourse,
}
