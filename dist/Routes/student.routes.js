"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../Controllers/auth.controllers");
const user_controllers_1 = require("../Controllers/user.controllers");
const student_validators_1 = require("../Validators/student.validators");
const multer_1 = require("../config/multer");
const imageUploade_middleware_1 = __importDefault(require("../middlewares/imageUploade.middleware"));
const studentRoutes = express_1.default.Router();
studentRoutes.post('/signup', multer_1.multerConfig.uploadImage.single('profileImage'), student_validators_1.studentValidators.validateStudent, imageUploade_middleware_1.default, user_controllers_1.userControllers.createStudent);
studentRoutes.post('/login', student_validators_1.studentValidators.validateStudentLogin, auth_controllers_1.authControllers.studentLogin);
exports.default = studentRoutes;
