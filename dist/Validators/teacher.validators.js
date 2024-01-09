"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherValidators = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const validateTeacher = [
    (0, express_validator_1.body)('teacherId')
        .trim()
        .isString()
        .withMessage('Teacher ID must be a string')
        .matches(/^[A-Z]{3}-\d{4}$/)
        .withMessage('Invalid Teacher ID format'),
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
    (0, express_validator_1.body)('department')
        .trim()
        .isString()
        .withMessage('Department must be a string')
        .matches(/^[A-Z]+$/)
        .withMessage('Department must be 3 capital letters'),
    (0, express_validator_1.body)('designation')
        .trim()
        .isString()
        .withMessage('Designation must be a string')
        .isLength({ max: 48 })
        .withMessage('Designation must be at most 48 characters'),
    (0, express_validator_1.body)('specialization')
        .trim()
        .optional()
        .isString()
        .withMessage('Specialization must be a string')
        .isLength({ max: 256 })
        .withMessage('Specialization must be at most 256 characters'),
    (0, express_validator_1.body)('password')
        .trim()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6, max: 16 })
        .withMessage('Password must be between 6 and 16 characters'),
    (0, express_validator_1.body)('deptHead').isBoolean().withMessage('Dept Head must be a boolean'),
    (0, validationHandler_1.default)('Teacher validation failed'),
];
const validateHead = [
    (0, express_validator_1.param)('teacherId')
        .trim()
        .isString()
        .withMessage('Teacher ID must be a string')
        .matches(/^[A-Z]{3}-\d{4}$/)
        .withMessage('Invalid Teacher ID format'),
    (0, validationHandler_1.default)('Teacher validation failed'),
];
const validateTeacherLogin = [
    (0, express_validator_1.body)('teacherId')
        .trim()
        .isString()
        .withMessage('Teacher ID must be a string')
        .matches(/^[A-Z]{3}-\d{4}$/)
        .withMessage('Invalid Teacher ID format'),
    (0, express_validator_1.body)('password')
        .trim()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6, max: 16 })
        .withMessage('Password must be between 6 and 16 characters'),
    (0, validationHandler_1.default)('Teacher login validation failed'),
];
exports.teacherValidators = {
    validateTeacher,
    validateHead,
    validateTeacherLogin,
};
