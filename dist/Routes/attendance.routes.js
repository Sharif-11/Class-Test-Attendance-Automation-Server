"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controllers_1 = require("../Controllers/attendance.controllers");
const attendance_validator_1 = require("../Validators/attendance.validator");
const verifyBatch_1 = __importDefault(require("../middlewares/verifyBatch"));
const verifyInstructor_1 = __importDefault(require("../middlewares/verifyInstructor"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const attendanceRoutes = express_1.default.Router();
attendanceRoutes.post('/', 
// attendanceValidators.validateTakeAttendance,
// verifyUser('teacher'),
// verifyInstructor,
attendance_controllers_1.attendanceController.takeAttendance);
attendanceRoutes.get('/:courseCode', attendance_controllers_1.attendanceController.getAttendance);
attendanceRoutes.get('/calculate-attendance/:semesterId/:courseCode', 
// attendanceValidators.validateCalculateStudentAttendance,
(0, verifyUser_1.default)('student'), verifyBatch_1.default, attendance_controllers_1.attendanceController.calculateStudentAttendance);
attendanceRoutes.get('/tabulate-attendance/:courseCode', attendance_validator_1.attendanceValidators.validateTabulateStudentAttendance, (0, verifyUser_1.default)('teacher'), verifyInstructor_1.default, attendance_controllers_1.attendanceController.tabulateStudentAttendance);
exports.default = attendanceRoutes;
