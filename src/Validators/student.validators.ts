import { body } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateStudent = [
  body('studentId')
    .isString()
    .withMessage('Student ID must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Student ID must be 7 characters')
    .isNumeric()
    .withMessage('Student ID must contain only digits'),

  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 48 })
    .withMessage('Name must be at most 48 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address')
    .isLength({ max: 48 })
    .withMessage('Email must be at most 48 characters'),

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
    ),

  body('department')
    .isString()
    .withMessage('Department must be a string')
    .isLength({ max: 3 })
    .matches(/^[A-Z]+$/)
    .withMessage('Department must be 3 capital letters'),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),
  validationErrorHandler,
]

export const studentValidators = { validateStudent }
