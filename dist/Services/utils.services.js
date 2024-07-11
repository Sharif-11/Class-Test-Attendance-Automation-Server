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
exports.nullifyTables = exports.extractBatch = exports.timestampToDate = exports.verifyDate = exports.generateToken = exports.comparePasswords = exports.hashPassword = exports.createSemesterId = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const utils_1 = require("../Shared/utils");
const config_1 = __importDefault(require("../config"));
const createSemesterId = (semesterTitle, batch) => {
    if (utils_1.semesterTitles[semesterTitle]) {
        return batch + utils_1.semesterTitles[semesterTitle];
    }
    else {
        throw new Error('Invalid semester title or batch');
    }
};
exports.createSemesterId = createSemesterId;
const hashPassword = (password) => {
    const hashedPassword = bcrypt_1.default.hashSync(password, Number(config_1.default.saltRounds));
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => {
    const match = bcrypt_1.default.compareSync(password, hashedPassword);
    return match;
};
exports.comparePasswords = comparePasswords;
const generateToken = (id, role) => {
    const token = jsonwebtoken_1.default.sign({ id, role }, config_1.default.jwtSecret, {
        expiresIn: '1y',
    });
    return token;
};
exports.generateToken = generateToken;
const verifyDate = (date) => {
    const today = new Date();
    return (today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear());
};
exports.verifyDate = verifyDate;
const timestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if necessary
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero if necessary
    return `${year}-${month}-${day}`;
};
exports.timestampToDate = timestampToDate;
const extractBatch = (semesterId) => {
    if (semesterId.length < 4) {
        return semesterId;
    }
    else {
        return semesterId.substring(0, 4);
    }
};
exports.extractBatch = extractBatch;
const nullifyTables = () => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all rows from Student_Attendance model
    yield prisma_1.default.student_Attendance.deleteMany();
    // Delete all rows from Mark model
    yield prisma_1.default.mark.deleteMany();
    // Delete all rows from Class_Test model
    yield prisma_1.default.class_Test.deleteMany();
    // Delete all rows from Attendance model
    yield prisma_1.default.attendance.deleteMany();
    // Delete all rows from Semester_Courses model
    yield prisma_1.default.semester_Courses.deleteMany();
    // Delete all rows from Student model
    yield prisma_1.default.student.deleteMany();
    // Delete all rows from Teacher model
    yield prisma_1.default.teacher.deleteMany();
    // Delete all rows from Course model
    yield prisma_1.default.course.deleteMany();
    // Delete all rows from Semester model
    yield prisma_1.default.semester.deleteMany();
});
exports.nullifyTables = nullifyTables;
