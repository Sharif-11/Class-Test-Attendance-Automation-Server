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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const response_services_1 = require("../Services/response.services");
const user_services_1 = require("../Services/user.services");
const utils_services_1 = require("../Services/utils.services");
const catchAsync_1 = __importDefault(require("../Shared/catchAsync"));
const createTeacher = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password, deptHead = 'false' } = _a, others = __rest(_a, ["password", "deptHead"]);
    const result = yield user_services_1.userServices.createTeacher(Object.assign(Object.assign({}, others), { password: (0, utils_services_1.hashPassword)(password), role: 'teacher', deptHead: deptHead.toLowerCase() === 'true' }));
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teacher created successfully',
        data: result,
    });
}));
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, studentId, name, email, batch, session, department, profileImage, } = req.body;
    const result = yield user_services_1.userServices.createStudent(studentId, name, email, batch, session, profileImage, department, (0, utils_services_1.hashPassword)(password));
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Student created successfully',
    });
}));
const getTeachers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1 } = req.query;
    const result = yield user_services_1.userServices.getTeachers(Number(page));
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Teachers retreived successfully',
    });
}));
const deleteTeacher = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    const result = yield user_services_1.userServices.deleteTeacher(teacherId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Teacher deleted successfully',
    });
}));
const makeHead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    const result = yield user_services_1.userServices.makeHead(teacherId);
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Head is assigned successfully',
    });
}));
const getStudentsOfBatch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { batch } = req.params;
    const { page } = req.query;
    const result = yield user_services_1.userServices.getStudentsOfBatch(batch, isNaN(Number(page)) ? 1 : Number(page));
    (0, response_services_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: `Students of batch ${batch} retreived successfully`,
    });
}));
exports.userControllers = {
    createTeacher,
    createStudent,
    makeHead,
    deleteTeacher,
    getTeachers,
    getStudentsOfBatch,
};
