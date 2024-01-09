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
exports.courseServices = void 0;
const prisma_1 = __importDefault(require("../Shared/prisma"));
const user_services_1 = require("./user.services");
const createCourse = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.create({ data: courseData });
    return course;
});
const getCourse = (courseCode) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.findUnique({ where: { courseCode } });
    if (!course) {
        throw new Error('Course with this id does not exist');
    }
    return course;
});
const getAllCourse = () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma_1.default.course.findMany({}); });
const updateCourse = (courseCode, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    yield getCourse(courseCode);
    const result = yield prisma_1.default.course.update({
        where: { courseCode },
        data: courseData,
    });
    return result;
});
const deleteCourse = (courseCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield getCourse(courseCode);
    const result = yield prisma_1.default.course.delete({ where: { courseCode } });
    return result;
});
const getCoursesOfTeacher = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_services_1.userServices.getSingleTeacher(teacherId);
    const result = yield prisma_1.default.semester_Courses.findMany({
        where: { teacherId },
        include: {
            semester: {
                select: {
                    semesterTitle: true,
                    batch: true,
                    session: true,
                },
            },
            course: {
                select: {
                    courseTitle: true,
                    credit: true,
                },
            },
        },
        orderBy: {
            course: {
                createdAt: 'desc',
            },
        },
    });
    return result;
});
exports.courseServices = {
    createCourse,
    updateCourse,
    getCourse,
    deleteCourse,
    getAllCourse,
    getCoursesOfTeacher,
};
