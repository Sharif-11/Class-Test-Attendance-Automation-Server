import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

// Validation for createCourse controller
const validateCreateCourse = [
  body('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('courseTitle')
    .trim()
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),

  body('credit')
    .trim()
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  validationErrorHandler('Course validation failed'),
]

// Validation for deleteCourse controller
const validateDeleteCourse = [
  param('courseCode')
    .trim()
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
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),

  body('courseTitle')
    .trim()
    .optional()
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),

  body('credit')
    .trim()
    .optional()
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  validationErrorHandler('Course validation failed'),
]

export const courseValidators = {
  validateCreateCourse,
  validateDeleteCourse,
  validateUpdateCourse,
}
