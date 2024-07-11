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
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../Shared/prisma"));
const verifyCtPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { classTestId } = req.params || req.body;
    const { teacherId } = req.user;
    const existingCt = yield prisma_1.default.class_Test.findFirst({
        where: { classTestId },
    });
    const isInstructor = yield prisma_1.default.semester_Courses.findFirst({
        where: {
            teacherId,
            semesterId: existingCt === null || existingCt === void 0 ? void 0 : existingCt.semesterId,
            courseCode: existingCt === null || existingCt === void 0 ? void 0 : existingCt.courseCode,
        },
    });
    if (isInstructor) {
        next();
    }
    else {
        const errorResponse = {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'You are not permitted to access this ct',
        };
        res.status(http_status_1.default.UNAUTHORIZED).json(errorResponse);
    }
});
exports.default = verifyCtPermission;
