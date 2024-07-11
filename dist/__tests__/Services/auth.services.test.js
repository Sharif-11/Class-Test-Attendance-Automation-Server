"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const auth_services_1 = require("../../Services/auth.services");
const utilsServices = __importStar(require("../../Services/utils.services"));
const prisma_1 = __importDefault(require("../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
describe('Student Login', () => {
    const findUniqueMock = jest.spyOn(prisma_1.default.student, 'findUnique');
    const comparePasswordsMock = jest.spyOn(utilsServices, 'comparePasswords');
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Returns the student if it exists in the database for correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputData = { studentId: '1804001', password: '123456' };
        const output = {
            studentId: '1804001',
            name: 'Anirban Barua',
            email: 'u1804001@student.cuet.ac.bd',
            batch: '2018',
            session: '2018-2019',
            role: 'student',
            profileImage: 'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
            department: 'CSE',
        };
        findUniqueMock.mockResolvedValue({
            studentId: '1804001',
            name: 'Anirban Barua',
            email: 'u1804001@student.cuet.ac.bd',
            batch: '2018',
            session: '2018-2019',
            role: 'student',
            createdAt: new Date('2024-01-27 10:46:29.943'),
            profileImage: 'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
            password: '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
            department: 'CSE',
            updatedAt: new Date('2024-01-27 10:46:29.943'),
        });
        comparePasswordsMock.mockReturnValue(true);
        const result = yield auth_services_1.authServices.studentLogin(inputData.studentId, inputData.password);
        expect(result).toMatchObject(output);
        expect(prisma_1.default.student.findUnique).toHaveBeenCalledWith({
            where: { studentId: inputData.studentId },
        });
        expect(utilsServices.comparePasswords).toHaveBeenCalledWith(inputData.password, '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq');
    }));
    it('Throws Unauthorized Error for Nonexistent Student', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputData = { studentId: '1804035', password: '123456' };
        findUniqueMock.mockResolvedValue(null);
        yield expect(auth_services_1.authServices.studentLogin(inputData.studentId, inputData.password)).rejects.toEqual(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials'));
        expect(prisma_1.default.student.findUnique).toHaveBeenCalledWith({
            where: { studentId: inputData.studentId },
        });
        expect(utilsServices.comparePasswords).not.toHaveBeenCalled();
    }));
    it('Throws Unauthorized Error for Valid Student Id but Wrong Password', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputData = { studentId: '1804001', password: '1234567' };
        findUniqueMock.mockResolvedValue({
            studentId: '1804001',
            name: 'Anirban Barua',
            email: 'u1804001@student.cuet.ac.bd',
            batch: '2018',
            session: '2018-2019',
            role: 'student',
            createdAt: new Date('2024-01-27 10:46:29.943'),
            profileImage: 'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
            password: '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
            department: 'CSE',
            updatedAt: new Date('2024-01-27 10:46:29.943'),
        });
        comparePasswordsMock.mockReturnValue(false);
        yield expect(auth_services_1.authServices.studentLogin(inputData.studentId, inputData.password)).rejects.toEqual(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials'));
        expect(prisma_1.default.student.findUnique).toHaveBeenCalledWith({
            where: { studentId: inputData.studentId },
        });
        expect(utilsServices.comparePasswords).toHaveBeenCalledWith(inputData.password, '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq');
    }));
    // Add more test cases for error scenarios, edge cases, and security concerns as needed.
});
