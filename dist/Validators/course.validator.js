'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.courseValidators = exports.validateUpdateCourse = void 0
const express_validator_1 = require('express-validator')
const validationHandler_1 = __importDefault(
  require('../middlewares/validationHandler'),
)
// Validation for createCourse controller
const validateCreateCourse = [
  (0, express_validator_1.body)('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  (0, express_validator_1.body)('courseTitle')
    .trim()
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),
  (0, express_validator_1.body)('credit')
    .trim()
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  (0, validationHandler_1.default)('Course validation failed'),
]
// Validation for deleteCourse controller
const validateDeleteCourse = [
  (0, express_validator_1.param)('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  (0, validationHandler_1.default)('Course validation failed'),
]
// Validation for updateCourse controller
exports.validateUpdateCourse = [
  (0, express_validator_1.param)('courseCode')
    .trim()
    .isString()
    .withMessage('Course code must be a string')
    .isLength({ min: 7, max: 7 })
    .withMessage('Course code must be 7 characters')
    .matches(/^[A-Z]{3}-\d{3}$/)
    .withMessage('Invalid course code format.'),
  (0, express_validator_1.body)('courseTitle')
    .trim()
    .optional()
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ max: 48 })
    .withMessage('Course title must be at most 48 characters'),
  (0, express_validator_1.body)('credit')
    .trim()
    .optional()
    .isFloat()
    .withMessage('Credit must be a floating-point number'),
  (0, validationHandler_1.default)('Course validation failed'),
]
exports.courseValidators = {
  validateCreateCourse,
  validateDeleteCourse,
  validateUpdateCourse: exports.validateUpdateCourse,
}
