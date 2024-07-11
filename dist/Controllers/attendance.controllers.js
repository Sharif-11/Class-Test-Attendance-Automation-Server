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
const utils_services_1 = require("../Services/utils.services");
const catchAsync_1 = __importDefault(require("../Shared/catchAsync"));
const takeAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode, semesterId, date, attendances } = req.body;
    console.log(req.body);
    const data = yield attendance_services_1.attendanceServices.takeAttendance(semesterId, courseCode, new Date(date), attendances);
    console.log(data);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance is taken successfully',
        data,
    });
}));
const getAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode } = req.params;
    const { pageNo, pageSize, semesterId, date } = req.query;
    const data = yield attendance_services_1.attendanceServices.getAttendance(String(semesterId), courseCode, new Date(String(date)), isNaN(Number(pageNo)) ? 1 : Number(pageNo), isNaN(Number(pageSize)) ? 10 : Number(pageSize));
    const today = new Date(date);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Attendance of ${(0, utils_services_1.timestampToDate)(today.getTime())} retreived successfully`,
        data,
    });
}));
const calculateStudentAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId, courseCode } = req.params;
    console.log({ semesterId, courseCode });
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
    getAttendance,
};
