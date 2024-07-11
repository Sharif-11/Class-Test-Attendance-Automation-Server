"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_routes_1 = __importDefault(require("./attendance.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const course_routes_1 = __importDefault(require("./course.routes"));
const ct_routes_1 = __importDefault(require("./ct.routes"));
const semester_routes_1 = __importDefault(require("./semester.routes"));
const student_routes_1 = __importDefault(require("./student.routes"));
const teacher_routes_1 = __importDefault(require("./teacher.routes"));
const globalRoutes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/teacher',
        route: teacher_routes_1.default,
    },
    {
        path: '/student',
        route: student_routes_1.default,
    },
    {
        path: '/courses',
        route: course_routes_1.default,
    },
    {
        path: '/semesters',
        route: semester_routes_1.default,
    },
    {
        path: '/ct',
        route: ct_routes_1.default,
    },
    {
        path: '/attendances',
        route: attendance_routes_1.default,
    },
];
moduleRoutes.forEach(route => globalRoutes.use(route.path, route.route));
exports.default = globalRoutes;
