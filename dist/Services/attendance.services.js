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
exports.attendanceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const courses_services_1 = require("./courses.services");
const semester_services_1 = require("./semester.services");
const user_services_1 = require("./user.services");
const utils_services_1 = require("./utils.services");
const takeAttendance = (semesterId, courseCode, date, attendances) => __awaiter(void 0, void 0, void 0, function* () {
    const isToday = (0, utils_services_1.verifyDate)(date);
    if (!isToday) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The given date is incompatible');
    }
    const existingSemester = yield semester_services_1.semesterServices.getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    const existingSemesterCourses = yield prisma_1.default.semester_Courses.findFirst({
        where: { semesterId, courseCode },
    });
    if (!existingSemesterCourses) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The course does not belongs to this semester');
    }
    const existingAttendance = yield prisma_1.default.attendance.findFirst({
        where: { semesterId, courseCode, date },
    });
    for (const student of attendances) {
        const { studentId } = student;
        const existingStudent = yield prisma_1.default.student.findUnique({
            where: { studentId },
        });
        if (!existingStudent) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The student does not exist');
        }
        if (existingStudent.batch !== existingSemester.batch) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The student does not belongs to this semester');
        }
    }
    if (existingAttendance) {
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const results = [];
            for (const student of attendances) {
                const { studentId, present } = student;
                const result = yield tx.student_Attendance.upsert({
                    where: {
                        attendanceId_studentId: {
                            attendanceId: existingAttendance.attendanceId,
                            studentId,
                        },
                    },
                    create: {
                        attendanceId: existingAttendance.attendanceId,
                        studentId,
                        present,
                    },
                    update: { studentId, present },
                });
                if (!result) {
                    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Attendance taking failed');
                }
                results.push(result);
            }
            return results;
        }));
        return result;
    }
    else {
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const createdAttendance = yield tx.attendance.create({
                data: { semesterId, courseCode, date },
            });
            if (!createdAttendance) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Attendance taking failed');
            }
            const attendanceData = [];
            for (const student of attendances) {
                const { studentId, present } = student;
                attendanceData.push({
                    attendanceId: createdAttendance.attendanceId,
                    studentId,
                    present,
                });
            }
            const createdStudentAttendances = yield tx.student_Attendance.createMany({
                data: attendanceData,
            });
            return createdStudentAttendances;
        }));
        return result;
    }
});
const calclateStudentAttendance = (semesterId, courseCode, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield semester_services_1.semesterServices.getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    yield user_services_1.userServices.getSingleStudent(studentId);
    const existingSemesterCourses = yield prisma_1.default.semester_Courses.findFirst({
        where: { semesterId, courseCode },
    });
    if (!existingSemesterCourses) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The course does not belongs to this semester');
    }
    const totalClasses = yield prisma_1.default.attendance.count({
        where: { semesterId, courseCode },
    });
    const totalAttendances = yield prisma_1.default.student_Attendance.count({
        where: {
            studentId: studentId,
            present: true,
            attendance: {
                semesterId: semesterId,
                courseCode: courseCode,
            },
        },
    });
    return {
        totalAttendances,
        totalClasses,
        attendanceRatio: totalClasses > 0 ? (totalAttendances * 100) / totalClasses : null,
    };
});
const tabulateStudentAttendance = (semesterId, courseCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield semester_services_1.semesterServices.getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    const existingSemesterCourses = yield prisma_1.default.semester_Courses.findFirst({
        where: { semesterId, courseCode },
    });
    if (!existingSemesterCourses) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The course does not belongs to this semester');
    }
    const totalClasses = yield prisma_1.default.attendance.count({
        where: { semesterId, courseCode },
    });
    const studentTotalAttendance = yield prisma_1.default.student_Attendance.groupBy({
        by: ['studentId', 'present'],
        _count: {
            present: true,
        },
        where: {
            attendance: {
                semesterId: semesterId,
                courseCode: courseCode,
            },
        },
        having: { present: true },
    });
    return { totalClasses, studentTotalAttendance };
});
exports.attendanceServices = {
    takeAttendance,
    calclateStudentAttendance,
    tabulateStudentAttendance,
};
