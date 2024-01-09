"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../Controllers/auth.controllers");
const user_controllers_1 = require("../Controllers/user.controllers");
const teacher_validators_1 = require("../Validators/teacher.validators");
const multer_1 = require("../config/multer");
const imageUploade_middleware_1 = __importDefault(require("../middlewares/imageUploade.middleware"));
const verifyHead_1 = __importDefault(require("../middlewares/verifyHead"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const teacherRoutes = express_1.default.Router();
teacherRoutes.delete('/:teacherId', user_controllers_1.userControllers.deleteTeacher);
teacherRoutes.post('/signup', multer_1.multerConfig.uploadImage.single('profileImage'), teacher_validators_1.teacherValidators.validateTeacher, imageUploade_middleware_1.default, user_controllers_1.userControllers.createTeacher);
teacherRoutes.post('/login', teacher_validators_1.teacherValidators.validateTeacherLogin, auth_controllers_1.authControllers.teacherLogin);
teacherRoutes.post('/make-head/:teacherId', teacher_validators_1.teacherValidators.validateHead, (0, verifyUser_1.default)('teacher'), verifyHead_1.default, user_controllers_1.userControllers.makeHead);
exports.default = teacherRoutes;
