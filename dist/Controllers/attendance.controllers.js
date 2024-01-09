"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const attendance_services_1 = require("../Services/attendance.services");
const response_services_1 = require("../Services/response.services");
const catchAsync_1 = __importDefault(require("../Shared/catchAsync"));
const takeAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode, semesterId, date, attendances } = req.body;
    const data = yield attendance_services_1.attendanceServices.takeAttendance(semesterId, courseCode, new Date(date), attendances);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance is taken successfully',
        data,
    });
}));
const calculateStudentAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId, courseCode } = req.body;
    const { studentId } = req.user;
    const data = yield attendance_services_1.attendanceServices.calclateStudentAttendance(semesterId, courseCode, studentId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendances of a student calculated successfully',
        data,
    });
}));
const tabulateStudentAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode } = req.params;
    const { semesterId } = req.body;
    const data = yield attendance_services_1.attendanceServices.tabulateStudentAttendance(semesterId, courseCode);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance of a course tabulated successfully',
        data,
    });
}));
exports.attendanceController = {
    takeAttendance,
    calculateStudentAttendance,
    tabulateStudentAttendance,
};
