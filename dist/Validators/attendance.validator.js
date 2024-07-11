"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceValidators = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const validateTakeAttendance = [
    (0, express_validator_1.body)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format.'),
    (0, express_validator_1.body)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('semesterId must be numeric'),
    (0, express_validator_1.body)('date')
        .trim()
        .isISO8601()
        .toDate()
        .withMessage('Invalid date format. Should be in ISO8601 format'),
    (0, express_validator_1.body)('attendances')
        .trim()
        .isArray()
        .withMessage('Attendances must be an array')
        .notEmpty()
        .withMessage('Attendances array must not be empty'),
    (0, express_validator_1.body)('attendances.*.studentId')
        .trim()
        .isString()
        .withMessage('Student ID must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Student ID must be 7 characters')
        .isNumeric()
        .withMessage('Student ID must contain only digits'),
    (0, express_validator_1.body)('attendances.*.present')
        .trim()
        .isBoolean()
        .withMessage('Present must be a boolean'),
    (0, validationHandler_1.default)('Attendace validation failed'),
];
const validateCalculateStudentAttendance = [
    (0, express_validator_1.body)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('semesterId must be numeric'),
    (0, express_validator_1.body)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format.'),
    (0, validationHandler_1.default)('Attendance validation failed'),
];
const validateTabulateStudentAttendance = [
    (0, express_validator_1.body)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('semesterId must be numeric'),
    (0, express_validator_1.param)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format.'),
    (0, validationHandler_1.default)('Tabulating attendance validation failed'),
];
exports.attendanceValidators = {
    validateTakeAttendance,
    validateCalculateStudentAttendance,
    validateTabulateStudentAttendance,
};
