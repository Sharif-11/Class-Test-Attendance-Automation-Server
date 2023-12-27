import { body } from 'express-validator'
import { multerConfig } from '../config/multer'
import validationErrorHandler from '../middlewares/validationHandler'

const validateTeacher = [
  multerConfig.uploadImage.single('profileImage'),

  body('teacherId')
    .isString()
    .withMessage('Teacher ID must be a string')
    .matches(/^[a-zA-Z]{3}-\d{4}$/)
    .withMessage('Invalid Teacher ID format'),

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

  body('department')
    .isString()
    .withMessage('Department must be a string')
    .matches(/^[A-Z]+$/)
    .withMessage('Department must be 3 capital letters'),

  body('designation')
    .isString()
    .withMessage('Designation must be a string')
    .isLength({ max: 48 })
    .withMessage('Designation must be at most 48 characters'),

  body('specialization')
    .optional()
    .isString()
    .withMessage('Specialization must be a string')
    .isLength({ max: 256 })
    .withMessage('Specialization must be at most 256 characters'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be between 6 and 16 characters'),
  body('deptHead').isBoolean().withMessage('Dept Head must be a boolean'),
  validationErrorHandler,
]

export default validateTeacher
