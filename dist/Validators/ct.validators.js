"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctValidators = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const validateCreateCt = [
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
        .withMessage('Invalid course code format'),
    (0, express_validator_1.body)('full_mark')
        .trim()
        .isFloat()
        .withMessage('Full mark must be a floating-point number'),
    (0, validationHandler_1.default)('Class test validation failed'),
];
const validateEvaluateCt = [
    (0, express_validator_1.param)('classTestId')
        .trim()
        .isUUID()
        .withMessage('Class Test ID must be a valid uuid'),
    (0, validationHandler_1.default)('Evaluation validation failed'),
];
const validateGetAllCtResult = [
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters'),
    (0, express_validator_1.param)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format.'),
    (0, validationHandler_1.default)('Ct validation failed'),
];
const validateGetAllCt = [
    (0, express_validator_1.param)('courseCode')
        .trim()
        .isString()
        .withMessage('Course code must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Course code must be 7 characters')
        .matches(/^[A-Z]{3}-\d{3}$/)
        .withMessage('Invalid course code format.'),
    (0, express_validator_1.param)('semesterId')
        .trim()
        .isString()
        .withMessage('Semester ID must be a string')
        .isLength({ min: 5, max: 5 })
        .withMessage('Semester ID must be 5 characters'),
    (0, validationHandler_1.default)('Ct validation failed'),
];
const validateCalculateFinalResult = [
    (0, express_validator_1.param)('courseCode')
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
    (0, validationHandler_1.default)('Ct validation failed'),
];
const validateGetCtResultForTeacher = [
    (0, express_validator_1.param)('classTestId')
        .trim()
        .isUUID()
        .withMessage('Class Test ID must be a valid uuid'),
    (0, validationHandler_1.default)('Ct validation failed'),
];
exports.ctValidators = {
    validateCreateCt,
    validateEvaluateCt,
    validateGetAllCtResult,
    validateGetAllCt,
    validateCalculateFinalResult,
    validateGetCtResultForTeacher,
};
