import { body } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateStudent = [
  body('studentId')
    .trim()
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),

  body('name')
    .trim()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 48 })
    .withMessage('Name must be at most 48 characters'),

  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address')
    .isLength({ max: 48 })
    .withMessage('Email must be at most 48 characters'),

  body('batch')
    .trim()
    .isString()
    .withMessage('Batch must be a string')
    .isLength({ min: 4, max: 4 })
    .withMessage('Batch must be 4 digits')
    .isNumeric()
    .withMessage('Batch must be numeric'),

  body('session')
    .trim()
    .isString()
    .withMessage('Session must be a string')
    .matches(/^\d{4}-\d{4}$/)
    .withMessage(
      'Invalid session format, it should be in the form of YYYY-YYYY',
    ),

  body('department')
    .trim()
    .isString()
    .withMessage('Department must be a string')
    .isLength({ max: 3 })
    .matches(/^[A-Z]+$/)
    .withMessage('Department must be 3 capital letters'),

  body('password')
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),
  validationErrorHandler('Student validation failed'),
]
const validateStudentLogin = [
  body('studentId')
    .trim()
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),

  body('password')
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),

  validationErrorHandler('Student login validation failed'),
]
export const studentValidators = { validateStudent, validateStudentLogin }
