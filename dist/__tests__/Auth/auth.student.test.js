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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const auth_routes_1 = __importDefault(require("../../Routes/auth.routes"));
const auth_services_1 = require("../../Services/auth.services");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
describe('POST /student/login', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Reset all mocks after each test
    });
    it('should return 400 bad request for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(auth_services_1.authServices, 'studentLogin');
        const response = yield (0, supertest_1.default)(app).post('/auth/student/login').send({});
        expect(spy).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.data).toBeUndefined();
        expect(response.body.errorMessages).toBeTruthy();
    }));
    it('should return 401 unauthorized for invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/auth/student/login').send({
            studentId: '1804011',
            password: '123456',
        });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    }));
    it('should return 200 OK and a token on successful student login', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the behavior of authServices.studentLogin
        const response = yield (0, supertest_1.default)(app).post('/auth/student/login').send({
            studentId: '1804002',
            password: 'u1804002',
        });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data).toHaveProperty('token');
    }));
    // Add more test cases as needed
});
// Similar tests can be added for '/teacher/login'
