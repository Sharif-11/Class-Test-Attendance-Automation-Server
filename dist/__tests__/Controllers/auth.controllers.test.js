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
const http_status_1 = __importDefault(require("http-status"));
const supertest_1 = __importDefault(require("supertest"));
const auth_services_1 = require("../../Services/auth.services");
const utilityServices = __importStar(require("../../Services/utils.services"));
const app_1 = __importDefault(require("../../app"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
jest.mock('../../Services/auth.services.ts');
jest.mock('../../Services/utils.services');
describe('Student Login Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should log in a student and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedStudentLogin = jest.fn();
        const mockedGenerateToken = jest.spyOn(utilityServices, 'generateToken');
        const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MDQwMDEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcwNjg2MTE1MSwiZXhwIjoxNzM4NDE4NzUxfQ.kgjf1udmgoj9wCwC34slMzA70yvUgh1lohyTrjAz2Jc';
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
        auth_services_1.authServices.studentLogin = mockedStudentLogin.mockResolvedValue({
            studentId: '1804001',
            name: 'Anirban Barua',
            email: 'u1804001@student.cuet.ac.bd',
            batch: '2018',
            session: '2018-2019',
            role: 'student',
            createdAt: new Date('2024-01-27 10:46:29.943'),
            profileImage: 'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
            department: 'CSE',
            updatedAt: new Date('2024-01-27 10:46:29.943'),
        });
        mockedGenerateToken.mockReturnValue(mockedToken);
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/v1/student/login').send({
            studentId: '1804001',
            password: '123456',
        });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.token).toBe(mockedToken);
        expect(response.body.data.password).toBeUndefined();
        expect(response.body.data).toMatchObject(output);
        expect(auth_services_1.authServices.studentLogin).toHaveBeenCalledWith('1804001', '123456');
        // Verify that generateToken was called with the correct arguments
        expect(utilityServices.generateToken).toHaveBeenCalledWith('1804001', 'student');
        expect(response.header['set-cookie']).toBeDefined();
        // You can add more specific assertions based on your cookie settings
        const cookie = response.header['set-cookie'][0];
        expect(cookie).toContain(`token=${mockedToken}`);
        expect(cookie).toContain('HttpOnly');
        // expect(cookie).toContain(`Max-Age=${30 * 24 * 3600}`)
    }));
    it('should return error response for invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedStudentLogin = jest.fn();
        auth_services_1.authServices.studentLogin = mockedStudentLogin.mockRejectedValue(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials'));
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/v1/student/login').send({
            studentId: '1804035',
            password: '123456',
        });
        // console.log(response)
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.data).toBeUndefined();
        expect(auth_services_1.authServices.studentLogin).rejects.toThrow();
        expect(utilityServices.generateToken).toHaveBeenCalledTimes(0);
        expect(response.header['set-cookie']).toBeUndefined();
    }));
});
