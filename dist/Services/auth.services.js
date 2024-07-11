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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const utils_services_1 = require("./utils.services");
const studentLogin = (studentId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield prisma_1.default.student.findUnique({
        where: { studentId },
    });
    if (!existingStudent ||
        !(0, utils_services_1.comparePasswords)(password, existingStudent.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: currentPassword } = existingStudent, otherData = __rest(existingStudent, ["password"]);
    return otherData;
});
const teacherLogin = (teacherId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTeacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
    });
    if (!existingTeacher ||
        !(0, utils_services_1.comparePasswords)(password, existingTeacher.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: currentPassword } = existingTeacher, otherData = __rest(existingTeacher, ["password"]);
    return otherData;
});
exports.authServices = { studentLogin, teacherLogin };
