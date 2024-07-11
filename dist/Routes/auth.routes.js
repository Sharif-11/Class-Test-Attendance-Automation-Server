"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../Controllers/auth.controllers");
const student_validators_1 = require("../Validators/student.validators");
const teacher_validators_1 = require("../Validators/teacher.validators");
const authRoutes = express_1.default.Router();
authRoutes.post('/student/login', student_validators_1.studentValidators.validateStudentLogin, auth_controllers_1.authControllers.studentLogin);
authRoutes.post('/student/logout', auth_controllers_1.authControllers.studentLogout);
authRoutes.post('/teacher/login', teacher_validators_1.teacherValidators.validateTeacherLogin, auth_controllers_1.authControllers.teacherLogin);
authRoutes.post('/teacher/logout', auth_controllers_1.authControllers.teacherLogout);
exports.default = authRoutes;
