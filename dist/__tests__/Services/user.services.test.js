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
const client_1 = require("@prisma/client");
const user_services_1 = require("../../Services/user.services");
const prisma_1 = __importDefault(require("../../Shared/prisma"));
const utils_1 = require("../../Shared/utils");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma_1.default.student.deleteMany({}); }));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma_1.default.student.deleteMany({}); }));
describe('createStudent()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // or jest.resetAllMocks();
    });
    const spy = jest.spyOn(prisma_1.default.student, 'create');
    it('should create a student when database is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStudentData = {
            studentId: '1804001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            batch: '2018',
            session: '2018-2019',
            department: 'CSE',
            password: '123',
            profileImage: 'https://image1.jpg',
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const { name, email, batch, session, department, profileImage, studentId } = mockStudentData;
        const result = yield user_services_1.userServices.createStudent(studentId, name, email, batch, session, profileImage, department, mockStudentData.password);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, updatedAt, password } = mockStudentData, others = __rest(mockStudentData, ["createdAt", "updatedAt", "password"]);
        expect(result).toMatchObject(others);
        expect(spy).toHaveBeenCalledTimes(1);
    }));
    it('should raise error for duplicate student id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStudentData = {
            studentId: '1804001',
            name: 'John Doe',
            email: 'john.does@example.com',
            batch: '2018',
            session: '2018-2019',
            department: 'CSE',
            password: '123',
            profileImage: 'https://image1.jpg',
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const { name, email, batch, session, department, profileImage, studentId } = mockStudentData;
        try {
            yield user_services_1.userServices.createStudent(studentId, name, email, batch, session, profileImage, department, mockStudentData.password);
        }
        catch (error) {
            expect(error instanceof client_1.Prisma.PrismaClientKnownRequestError).toBe(true);
        }
        finally {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({
                data: {
                    studentId,
                    name,
                    email,
                    batch,
                    session,
                    profileImage,
                    department,
                    password: mockStudentData.password,
                    role: 'student',
                },
                select: utils_1.studentSelect,
            });
        }
    }));
    it('should raise error for duplicate email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStudentData = {
            studentId: '1804002',
            name: 'John Doe',
            email: 'john.doe@example.com',
            batch: '2018',
            session: '2018-2019',
            department: 'CSE',
            password: '123',
            profileImage: 'https://image1.jpg',
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const { name, email, batch, session, department, profileImage, studentId } = mockStudentData;
        try {
            yield user_services_1.userServices.createStudent(studentId, name, email, batch, session, profileImage, department, mockStudentData.password);
        }
        catch (error) {
            expect(error instanceof client_1.Prisma.PrismaClientKnownRequestError).toBe(true);
        }
        finally {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({
                data: {
                    studentId,
                    name,
                    email,
                    batch,
                    session,
                    profileImage,
                    department,
                    password: mockStudentData.password,
                    role: 'student',
                },
                select: utils_1.studentSelect,
            });
        }
    }));
    it('should create student with unique studentId and email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockStudentData = {
            studentId: '1804002',
            name: 'John Doe',
            email: 'u1804002@example.com',
            batch: '2018',
            session: '2018-2019',
            department: 'CSE',
            password: '123',
            profileImage: 'https://image1.jpg',
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const { name, email, batch, session, department, profileImage, studentId } = mockStudentData;
        try {
            const result = yield user_services_1.userServices.createStudent(studentId, name, email, batch, session, profileImage, department, mockStudentData.password);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, password } = mockStudentData, others = __rest(mockStudentData, ["createdAt", "updatedAt", "password"]);
            expect(result).toMatchObject(others);
        }
        catch (error) {
            expect(error).toBeUndefined();
        }
        finally {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({
                data: {
                    studentId,
                    name,
                    email,
                    batch,
                    session,
                    profileImage,
                    department,
                    password: mockStudentData.password,
                    role: 'student',
                },
                select: utils_1.studentSelect,
            });
        }
    }));
});
