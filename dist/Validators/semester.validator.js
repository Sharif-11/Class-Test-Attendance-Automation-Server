"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterValidators = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
// Validation for createSemester controller
const validateCreateSemester = [
    (0, express_validator_1.body)('semesterTitle')
        .trim()
        .isString()
        .withMessage('Semester title must be a string')
        .matches(/^(Level-[1-4] Term-[1-2])$/)
        .withMessage('Invalid semester title format'),
    (0, express_validator_1.body)('batch')
        .trim()
        .isString()
        .withMessage('Batch must be a string')
        .isLength({ min: 4, max: 4 })
        .withMessage('Batch must be 4 digits')
        .isNumeric()
        .withMessage('Batch must be numeric'),
    (0, express_validator_1.body)('session')
        .trim()
        .isString()
        .withMessage('Session must be a string')
        .matches(/^\d{4}-\d{4}$/)
        .withMessage('Invalid session format, it should be in the form of YYYY-YYYY')
        .custom((value) => {
        const years = value.split('-').map(e => Number(e));
        return years[1] - years[0] === 1;
    })
        .withMessage('Year must be consecutive'),
    (0, validationHandler_1.default)('Semester validation failed'),
];
// Validation for updateSemester controller
const validateUpdateSemester = [
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('Semester ID must contain only digits'),
    (0, express_validator_1.body)('semesterTitle')
        .trim()
        .optional()
        .isString()
        .withMessage('Semester title must be a string')
        .matches(/^(Level-[1-4] Term-[1-2])$/)
        .withMessage('Invalid semester title format'),
    (0, express_validator_1.body)('batch')
        .trim()
        .optional()
        .isString()
        .withMessage('Batch must be a string')
        .isLength({ min: 4, max: 4 })
        .withMessage('Batch must be 4 digits')
        .isNumeric()
        .withMessage('Batch must be numeric'),
    (0, express_validator_1.body)('session')
        .trim()
        .optional()
        .isString()
        .withMessage('Session must be a string')
        .matches(/^\d{4}-\d{4}$/)
        .withMessage('Invalid session format, it should be in the form of YYYY-YYYY')
        .custom((value) => {
        const years = value.split('-').map(e => Number(e));
        return years[1] - years[0] === 1;
    })
        .withMessage('Year must be consecutive'),
    (0, validationHandler_1.default)('Semester validation failed'),
];
// Validation for deleteSemester controller
const validateDeleteSemester = [
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('Semester ID must contain only digits'),
    (0, validationHandler_1.default)('Semester validation failed'),
];
// Validation for getSemesterCourses controller
const validateGetSemesterCourses = [
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('Semester ID must contain only digits'),
    (0, validationHandler_1.default)('Semester validation failed'),
];
// Validation for assignCourse controller
const validateAssignCourse = [
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters')
        .isNumeric()
        .withMessage('Semester ID must contain only digits'),
    (0, express_validator_1.body)('teacherId')
        .trim()
        .isString()
        .withMessage('Teacher ID must be a string')
        .matches(/^[A-Z]{3}-\d{4}$/)
        .withMessage('Invalid Teacher ID format'),
    (0, express_validator_1.body)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format'),
    (0, validationHandler_1.default)('Assign course validation failed'),
];
exports.semesterValidators = {
    validateCreateSemester,
    validateDeleteSemester,
    validateAssignCourse,
    validateGetSemesterCourses,
    validateUpdateSemester,
};
