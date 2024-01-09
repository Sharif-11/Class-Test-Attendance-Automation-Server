"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controllers_1 = require("../Controllers/course.controllers");
const course_validator_1 = require("../Validators/course.validator");
const verifyHead_1 = __importDefault(require("../middlewares/verifyHead"));
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const courseRoutes = express_1.default.Router();
courseRoutes.post('/', course_validator_1.courseValidators.validateCreateCourse, (0, verifyUser_1.default)('teacher'), verifyHead_1.default, course_controllers_1.courseControllers.createCourse);
courseRoutes.get('/', (0, verifyUser_1.default)('teacher'), verifyHead_1.default, course_controllers_1.courseControllers.getAllCourses);
courseRoutes.delete('/:courseCode', course_validator_1.courseValidators.validateDeleteCourse, (0, verifyUser_1.default)('teacher'), verifyHead_1.default, course_controllers_1.courseControllers.deleteCourse);
courseRoutes.patch('/:courseCode', course_validator_1.courseValidators.validateUpdateCourse, (0, verifyUser_1.default)('teacher'), verifyHead_1.default, course_controllers_1.courseControllers.updateCourse);
courseRoutes.get('/teacher-courses', (0, verifyUser_1.default)('teacher'), course_controllers_1.courseControllers.getCoursesOfTeacher);
exports.default = courseRoutes;
