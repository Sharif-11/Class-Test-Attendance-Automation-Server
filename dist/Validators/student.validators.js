"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidators = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const validateStudent = [
    (0, express_validator_1.body)('studentId')
        .trim()
        .isString()
        .withMessage('Student ID must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Student ID must be 7 characters')
        .isNumeric()
        .withMessage('Student ID must contain only digits'),
    (0, express_validator_1.body)('name')
        .trim()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ max: 48 })
        .withMessage('Name must be at most 48 characters'),
    (0, express_validator_1.body)('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address')
        .isLength({ max: 48 })
        .withMessage('Email must be at most 48 characters'),
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
        .withMessage('Invalid session format, it should be in the form of YYYY-YYYY'),
    (0, express_validator_1.body)('department')
        .trim()
        .isString()
        .withMessage('Department must be a string')
        .isLength({ max: 3 })
        .matches(/^[A-Z]+$/)
        .withMessage('Department must be 3 capital letters'),
    (0, express_validator_1.body)('password')
        .trim()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6, max: 16 })
        .withMessage('Password must be between 6 and 16 characters'),
    (0, validationHandler_1.default)('Student validation failed'),
];
const validateStudentLogin = [
    (0, express_validator_1.body)('studentId')
        .trim()
        .isString()
        .withMessage('Student ID must be a string')
        .isLength({ min: 7, max: 7 })
        .withMessage('Student ID must be 7 characters')
        .isNumeric()
        .withMessage('Student ID must contain only digits'),
    (0, express_validator_1.body)('password')
        .trim()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6, max: 16 })
        .withMessage('Password must be between 6 and 16 characters'),
    (0, validationHandler_1.default)('Student login validation failed'),
];
const validateBatch = [
    (0, express_validator_1.param)('batch')
        .trim()
        .isString()
        .withMessage('Batch must be a string')
        .isLength({ min: 4, max: 4 })
        .withMessage('Batch must be 4 digits')
        .isNumeric()
        .withMessage('Batch must be numeric'),
    (0, validationHandler_1.default)('Batch validation failed'),
];
exports.studentValidators = {
    validateStudent,
    validateStudentLogin,
    validateBatch,
};
