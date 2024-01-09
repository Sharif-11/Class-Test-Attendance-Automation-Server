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
exports.classTestServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const courses_services_1 = require("./courses.services");
const semester_services_1 = require("./semester.services");
const user_services_1 = require("./user.services");
const createCt = (semesterId, courseCode, full_mark) => __awaiter(void 0, void 0, void 0, function* () {
    yield semester_services_1.semesterServices.getSemester(semesterId);
    const existingCourse = yield courses_services_1.courseServices.getCourse(courseCode);
    const existingSemesterCourse = yield prisma_1.default.semester_Courses.findFirst({
        where: { semesterId, courseCode },
    });
    if (!existingSemesterCourse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Course is not assigned to the semester');
    }
    const ctCount = yield prisma_1.default.class_Test.findMany({
        where: { semesterId, courseCode },
    });
    if ((ctCount === null || ctCount === void 0 ? void 0 : ctCount.length) >= existingCourse.credit + 1) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are trying to create too many class test for a course');
    }
    const result = yield prisma_1.default.class_Test.create({
        data: { semesterId, courseCode, full_mark },
    });
    return result;
});
const getCt = (classTestId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.class_Test.findUnique({ where: { classTestId } });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Class test with this id does not exist');
    }
    return result;
});
const getAllCt = (semesterId, courseCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield semester_services_1.semesterServices.getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    const result = yield prisma_1.default.class_Test.findMany({
        where: { semesterId, courseCode },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return result;
});
const getCtResultForTeacher = (classTestId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCt = yield getCt(classTestId);
    if (existingCt.evaluated === false) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This ct is not evaluated yet');
    }
    const result = yield prisma_1.default.mark.findMany({
        where: {
            classTestId,
        },
        select: {
            studentId: true,
            marks: true,
        },
        orderBy: {
            studentId: 'asc',
        },
    });
    return result;
});
const updateCt = (classTestId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield getCt(classTestId);
    const result = yield prisma_1.default.class_Test.update({
        where: { classTestId },
        data,
    });
    return result;
});
const deleteCt = (classTestId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getCt(classTestId);
    const result = yield prisma_1.default.class_Test.delete({ where: { classTestId } });
    return result;
});
const evaluateCt = (classTestId, marksData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCt = yield getCt(classTestId);
    const { semesterId, courseCode, full_mark } = existingCt;
    const existingSemester = yield semester_services_1.semesterServices.getSemester(semesterId);
    for (const markData of marksData) {
        const { studentId, marks } = markData;
        const existingStudent = yield user_services_1.userServices.getSingleStudent(String(studentId));
        if (!existingStudent) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student with those id does not exist');
        }
        if (existingSemester.batch !== existingStudent.batch) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The students does not belongs to the semester');
        }
        if (Number(marks) < 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Marks can not be negative');
        }
        if (Number(marks) > full_mark) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'marks can not be greater than full marks');
        }
    }
    const totalStudent = yield prisma_1.default.student.findMany({
        where: { batch: existingSemester.batch },
    });
    const data = [];
    for (const markData of marksData) {
        data.push({
            semesterId,
            courseCode,
            classTestId,
            studentId: String(markData.studentId),
            marks: Number(markData.marks),
        });
    }
    if (totalStudent.length !== data.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The all students of the semester should be added');
    }
    const transactionResult = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const currentStatus = yield tx.class_Test.findFirst({
            where: { classTestId },
        });
        const updateCtStatus = yield tx.class_Test.update({
            where: { classTestId },
            data: { evaluated: true },
        });
        if (!updateCtStatus) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'evaluation of class test failed');
        }
        if ((currentStatus === null || currentStatus === void 0 ? void 0 : currentStatus.evaluated) === true) {
            const deleteAllResult = yield tx.mark.deleteMany({
                where: { classTestId },
            });
            if (!deleteAllResult) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'evaluation of class test failed');
            }
        }
        const result = yield tx.mark.createMany({ data });
        return result;
    }));
    return transactionResult;
});
const getAllCtResult = (semesterId, courseCode, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingSemester = yield semester_services_1.semesterServices.getSemester(semesterId);
    yield courses_services_1.courseServices.getCourse(courseCode);
    const existingStudent = yield user_services_1.userServices.getSingleStudent(studentId);
    const existingSemesterCourse = yield prisma_1.default.semester_Courses.findFirst({
        where: { semesterId, courseCode },
    });
    if (existingStudent.batch !== existingSemester.batch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The student does not belongs to this course');
    }
    if (!existingSemesterCourse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The course are not assigned to this semester');
    }
    const classTestsWithMarks = yield prisma_1.default.class_Test.findMany({
        where: {
            AND: [
                { semesterId, courseCode },
                { Mark: { some: { studentId: studentId } } },
            ],
        },
        include: {
            Mark: {
                where: {
                    studentId: studentId,
                },
            },
            course: { select: { courseTitle: true, credit: true } },
            semester: { select: { semesterTitle: true } },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return classTestsWithMarks;
});
const calculateFinalResult = (semesterId, courseCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield semester_services_1.semesterServices.getSemester(semesterId);
    const existingCourse = yield courses_services_1.courseServices.getCourse(courseCode);
    const topMarksByStudent = yield prisma_1.default.mark.groupBy({
        by: ['studentId', 'semesterId', 'courseCode'],
        where: { semesterId, courseCode },
        _sum: {
            marks: true,
        },
        _count: {
            marks: true,
        },
    });
    if (topMarksByStudent[0]._count.marks <= existingCourse.credit) {
        return topMarksByStudent;
    }
    const worstMarkByStudent = yield prisma_1.default.mark.groupBy({
        by: ['studentId', 'semesterId', 'courseCode'],
        where: { semesterId, courseCode },
        _min: {
            marks: true,
        },
    });
    const finalMark = topMarksByStudent.map((item, idx) => {
        if (item._sum.marks && worstMarkByStudent[idx]._min.marks) {
            item._sum.marks -= worstMarkByStudent[idx]._min.marks;
        }
        return item;
    });
    return finalMark;
});
exports.classTestServices = {
    createCt,
    getCt,
    getAllCt,
    updateCt,
    deleteCt,
    evaluateCt,
    getAllCtResult,
    getCtResultForTeacher,
    calculateFinalResult,
};
