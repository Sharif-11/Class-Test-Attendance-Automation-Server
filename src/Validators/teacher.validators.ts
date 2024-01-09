import { body, param } from 'express-validator'
import validationErrorHandler from '../middlewares/validationHandler'

const validateTeacher = [
  body('teacherId')
    .trim()
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),

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

  body('department')
    .trim()
    .isString()
    .withMessage('Department must be a string')
    .matches(/^[A-Z]+$/)
    .withMessage('Department must be 3 capital letters'),

  body('designation')
    .trim()
    .isString()
    .withMessage('Designation must be a string')
    .isLength({ max: 48 })
    .withMessage('Designation must be at most 48 characters'),

  body('specialization')
    .trim()
    .optional()
    .isString()
    .withMessage('Specialization must be a string')
    .isLength({ max: 256 })
    .withMessage('Specialization must be at most 256 characters'),
  body('password')
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),
  body('deptHead').isBoolean().withMessage('Dept Head must be a boolean'),
  validationErrorHandler('Teacher validation failed'),
]

const validateHead = [
  param('teacherId')
    .trim()
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),
  validationErrorHandler('Teacher validation failed'),
]

const validateTeacherLogin = [
  body('teacherId')
    .trim()
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),

  body('password')
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),

  validationErrorHandler('Teacher login validation failed'),
]

export const teacherValidators = {
  validateTeacher,
  validateHead,
  validateTeacherLogin,
}
