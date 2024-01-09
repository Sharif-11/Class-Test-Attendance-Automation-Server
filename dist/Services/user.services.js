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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const utils_1 = require("../Shared/utils");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const createStudent = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.default.student.create({
        data: studentData,
        select: utils_1.studentSelect,
    });
    return student;
});
const createTeacher = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const { deptHead } = teacherData;
    if (deptHead === true) {
        const existingHead = yield prisma_1.default.teacher.findFirst({ where: { deptHead } });
        if (existingHead) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'There is a department Head already');
        }
    }
    const teacher = yield prisma_1.default.teacher.create({
        data: teacherData,
        select: utils_1.teacherSelect,
    });
    return teacher;
});
const updateStudent = (studentId, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password } = studentData, otherData = __rest(studentData, ["password"]);
    const existingStudent = yield prisma_1.default.student.findUnique({
        where: { studentId },
    });
    if (!existingStudent) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Student with this id doesn't exist");
    }
    const updatedStudent = yield prisma_1.default.student.update({
        where: {
            studentId,
        },
        data: otherData,
        select: utils_1.studentSelect,
    });
    return updatedStudent;
});
const updateTeacher = (teacherId, teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, deptHead } = teacherData, otherData = __rest(teacherData, ["password", "deptHead"]);
    const existingTeacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
    });
    if (!existingTeacher) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Teacher with this id doesn't exist");
    }
    const updatedTeacher = yield prisma_1.default.teacher.update({
        where: {
            teacherId,
        },
        data: otherData,
        select: utils_1.teacherSelect,
    });
    return updatedTeacher;
});
const getStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield prisma_1.default.student.findMany({
        select: utils_1.studentSelect,
    });
    return students;
});
const getTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield prisma_1.default.teacher.findMany({
        select: utils_1.teacherSelect,
    });
    return teachers;
});
const getSingleStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.default.student.findUnique({
        where: { studentId },
        select: utils_1.studentSelect,
    });
    if (!student) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student with this id does not exist');
    }
    return student;
});
const getSingleTeacher = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
        select: utils_1.teacherSelect,
    });
    if (!teacher) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Teacher with this id does not exist');
    }
    return teacher;
});
const updateStudentPassword = (studentId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma_1.default.student.update({
        where: { studentId },
        data: {
            password: newPassword,
        },
        select: utils_1.studentSelect,
    });
    return updatedUser;
});
const updateTeacherPassword = (teacherId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma_1.default.teacher.update({
        where: { teacherId },
        data: {
            password: newPassword,
        },
        select: utils_1.teacherSelect,
    });
    return updatedUser;
});
const deleteStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield prisma_1.default.student.findUnique({
        where: { studentId },
    });
    if (!existingStudent) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student with this id does not exist');
    }
    const deletedStudent = yield prisma_1.default.student.delete({
        where: { studentId },
        select: utils_1.studentSelect,
    });
    return deletedStudent;
});
const deleteTeacher = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTeacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
    });
    if (!existingTeacher) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Teacher with this id does not exist');
    }
    if (existingTeacher.deptHead) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Department Head can not be deleted');
    }
    const deletedTeacher = yield prisma_1.default.teacher.delete({
        where: { teacherId },
        select: utils_1.teacherSelect,
    });
    return deletedTeacher;
});
const isHead = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTeacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
    });
    if (!existingTeacher) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Teacher with this id does not exist');
    }
    return existingTeacher.deptHead;
});
const makeHead = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentHead = yield prisma_1.default.teacher.findFirst({
        where: { deptHead: true },
    });
    const existingTeacher = yield prisma_1.default.teacher.findUnique({
        where: { teacherId },
    });
    if (!existingTeacher) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Teacher with this id does not exist');
    }
    const updatedHead = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const nullifyHead = yield tx.teacher.update({
            where: { teacherId: currentHead === null || currentHead === void 0 ? void 0 : currentHead.teacherId },
            data: { deptHead: false },
        });
        if (!nullifyHead) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Head creation failed');
        }
        const updatedHead = yield tx.teacher.update({
            where: { teacherId },
            data: { deptHead: true },
            select: utils_1.teacherSelect,
        });
        return updatedHead;
    }));
    return updatedHead;
});
exports.userServices = {
    createStudent,
    createTeacher,
    updateStudent,
    updateTeacher,
    getStudents,
    getTeachers,
    getSingleStudent,
    getSingleTeacher,
    updateStudentPassword,
    updateTeacherPassword,
    deleteStudent,
    deleteTeacher,
    isHead,
    makeHead,
};
