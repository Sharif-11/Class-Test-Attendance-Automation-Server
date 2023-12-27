import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateCreateCt = [
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
    .withMessage('Invalid course code format'),

  body('full_mark')
    .isFloat()
    .withMessage('Full mark must be a floating-point number'),
  validationErrorHandler('Class test validation failed'),
]
const validateEvaluateCt = [
  param('classTestId')
    .isUUID()
    .withMessage('Class Test ID must be a valid uuid'),
  validationErrorHandler('Evaluation validation failed'),
]
const validateGetAllCtResult = [
  body('semesterId')
    .isString()
    .withMessage('Semester ID must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Semester ID must be 5 characters'),

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
  validationErrorHandler('Ct validation failed'),
]
const validateGetAllCt = [
  param('courseCode')
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
    .withMessage('Semester ID must be 5 characters'),
  validationErrorHandler('Ct validation failed'),
]
const validateCalculateFinalResult = [
  param('courseCode')
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
  validationErrorHandler('Ct validation failed'),
]
const validateGetCtResultForTeacher = [
  param('classTestId')
    .isUUID()
    .withMessage('Class Test ID must be a valid uuid'),
  validationErrorHandler('Ct validation failed'),
]
export const ctValidators = {
  validateCreateCt,
  validateEvaluateCt,
  validateGetAllCtResult,
  validateGetAllCt,
  validateCalculateFinalResult,
  validateGetCtResultForTeacher,
}
