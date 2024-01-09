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
exports.semesterServices = void 0;
const prisma_1 = __importDefault(require("../Shared/prisma"));
const courses_services_1 = require("./courses.services");
const user_services_1 = require("./user.services");
const utils_services_1 = require("./utils.services");
const createSemester = (semesterTitle, batch, session) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterId = (0, utils_services_1.createSemesterId)(semesterTitle, batch);
    const semester = yield prisma_1.default.semester.create({
        data: { semesterTitle, batch, semesterId, session },
    });
    return semester;
});
const getSemester = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.semester.findUnique({ where: { semesterId } });
    if (!result) {
        throw new Error('Semester with this id doesn not exist');
    }
    return result;
});
const getAllSemesters = () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma_1.default.semester.findMany(); });
const updateSemester = (semesterId, semesterData) => __awaiter(void 0, void 0, void 0, function* () {
    yield getSemester(semesterId);
    const result = yield prisma_1.default.semester.update({
        where: { semesterId },
        data: semesterData,
    });
    return result;
});
const deleteSemester = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getSemester(semesterId);
    const result = yield prisma_1.default.semester.delete({ where: { semesterId } });
    return result;
});
const assignCourse = (semesterId, courseCode, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_services_1.userServices.getSingleTeacher(teacherId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    yield getSemester(semesterId);
    const assignedCourse = yield prisma_1.default.semester_Courses.create({
        data: {
            semesterId,
            courseCode,
            teacherId,
        },
        include: {
            semester: {
                select: { semesterTitle: true, batch: true },
            },
            course: { select: { courseCode: true, courseTitle: true, credit: true } },
            teacher: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    });
    return assignedCourse;
});
const getSemesterCourses = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getSemester(semesterId);
    const coursesForSemester = yield prisma_1.default.semester_Courses.findMany({
        where: {
            semesterId,
        },
        distinct: ['courseCode'],
        include: {
            course: {
                select: {
                    courseCode: true,
                    courseTitle: true,
                    credit: true,
                },
            },
        },
    });
    const coursesWithTeachers = yield Promise.all(coursesForSemester.map(({ course }) => __awaiter(void 0, void 0, void 0, function* () {
        const teachersForCourse = yield prisma_1.default.semester_Courses.findMany({
            where: {
                semesterId,
                courseCode: course.courseCode,
            },
            include: {
                teacher: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return {
            course,
            teachers: teachersForCourse.map(({ teacher }) => teacher),
        };
    })));
    return coursesWithTeachers;
});
const unassignCourse = (semesterId, courseCode, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    yield user_services_1.userServices.getSingleTeacher(teacherId);
    const result = yield prisma_1.default.semester_Courses.delete({
        where: {
            semesterId_courseCode_teacherId: { semesterId, courseCode, teacherId },
        },
    });
    return result;
});
const getSemesterOfStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStudent = yield user_services_1.userServices.getSingleStudent(studentId);
    const semesters = yield prisma_1.default.semester.findMany({
        where: { batch: existingStudent.batch },
        orderBy: {
            semesterTitle: 'desc',
        },
    });
    return semesters;
});
exports.semesterServices = {
    createSemester,
    getSemester,
    getAllSemesters,
    updateSemester,
    deleteSemester,
    assignCourse,
    getSemesterCourses,
    unassignCourse,
    getSemesterOfStudent,
};
