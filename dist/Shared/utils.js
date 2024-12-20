"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPageSize = exports.semesterTitles = exports.teacherSelect = exports.studentSelect = void 0;
exports.studentSelect = {
    studentId: true,
    name: true,
    email: true,
    batch: true,
    session: true,
    department: true,
    role: true,
    profileImage: true,
    createdAt: true,
    updatedAt: true,
};
exports.teacherSelect = {
    teacherId: true,
    name: true,
    email: true,
    department: true,
    role: true,
    designation: true,
    specialization: true,
    profileImage: true,
    deptHead: true,
    createdAt: true,
    updatedAt: true,
};
exports.semesterTitles = {
    'Level-1 Term-1': 1,
    'Level-1 Term-2': 2,
    'Level-2 Term-1': 3,
    'Level-2 Term-2': 4,
    'Level-3 Term-1': 5,
    'Level-3 Term-2': 6,
    'Level-4 Term-1': 7,
    'Level-4 Term-2': 8,
};
exports.defaultPageSize = 5;
