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
exports.authControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_services_1 = require("../Services/auth.services");
const response_services_1 = require("../Services/response.services");
const utils_services_1 = require("../Services/utils.services");
const catchAsync_1 = __importDefault(require("../Shared/catchAsync"));
const studentLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, password } = req.body;
    const student = yield auth_services_1.authServices.studentLogin(studentId, password);
    const token = (0, utils_services_1.generateToken)(studentId, 'student');
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 3600 });
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student logged in successfully',
        data: Object.assign(Object.assign({}, student), { token }),
    });
}));
const teacherLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, password } = req.body;
    const teacher = yield auth_services_1.authServices.teacherLogin(teacherId, password);
    const token = (0, utils_services_1.generateToken)(teacherId, 'teacher');
    res.cookie('token', token, { httpOnly: true });
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teacher logged in successfully',
        data: Object.assign(Object.assign({}, teacher), { token }),
    });
}));
const studentLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Assuming you are using JWT for authentication and 'token' cookie to store the token
    res.clearCookie('token');
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student logged out successfully',
        data: null,
    });
});
const teacherLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Assuming you are using JWT for authentication and 'token' cookie to store the token
    res.clearCookie('token');
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teacher logged out successfully',
        data: null,
    });
});
exports.authControllers = {
    studentLogin,
    teacherLogin,
    studentLogout,
    teacherLogout,
};
