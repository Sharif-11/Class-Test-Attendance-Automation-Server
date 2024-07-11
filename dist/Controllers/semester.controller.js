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
exports.semesterControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const response_services_1 = require("../Services/response.services");
const semester_services_1 = require("../Services/semester.services");
const catchAsync_1 = __importDefault(require("../Shared/catchAsync"));
const createSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterTitle, batch, session } = req.body;
    const data = yield semester_services_1.semesterServices.createSemester(semesterTitle, batch, session);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester created successfully',
        data,
    });
}));
const getAllSemesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const data = yield semester_services_1.semesterServices.getAllSemesters(Number(page));
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters found successfully',
        data,
    });
}));
const updateSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const data = yield semester_services_1.semesterServices.updateSemester(semesterId, req.body);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters updated successfully',
        data,
    });
}));
const deleteSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const data = yield semester_services_1.semesterServices.deleteSemester(semesterId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters deleted successfully',
        data,
    });
}));
const getSemestersOfStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.user;
    const data = yield semester_services_1.semesterServices.getSemesterOfStudent(studentId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters retreived  successfully',
        data,
    });
}));
const getSemesterCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const data = yield semester_services_1.semesterServices.getSemesterCourses(semesterId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semesters of the course retreived successfully',
        data,
    });
}));
const assignCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const { teacherId, courseCode } = req.body;
    const data = yield semester_services_1.semesterServices.assignCourse(semesterId, courseCode, teacherId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'course assigned  successfully',
        data,
    });
}));
exports.semesterControllers = {
    createSemester,
    getAllSemesters,
    updateSemester,
    deleteSemester,
    getSemestersOfStudent,
    getSemesterCourses,
    assignCourse,
};
