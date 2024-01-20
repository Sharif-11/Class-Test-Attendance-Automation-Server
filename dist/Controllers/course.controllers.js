'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.courseControllers = void 0
const http_status_1 = __importDefault(require('http-status'))
const courses_services_1 = require('../Services/courses.services')
const response_services_1 = require('../Services/response.services')
const catchAsync_1 = __importDefault(require('../Shared/catchAsync'))
const createCourse = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = yield courses_services_1.courseServices.createCourse(req.body)
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      message: 'Course created successfully',
      success: true,
      data,
    })
  }),
)
const deleteCourse = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode } = req.params
    const data =
      yield courses_services_1.courseServices.deleteCourse(courseCode)
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Course deleted successfully',
      data,
    })
  }),
)
const updateCourse = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode } = req.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = req.body,
      { courseCode: courseId } = _a,
      others = __rest(_a, ['courseCode'])
    const data = yield courses_services_1.courseServices.updateCourse(
      courseCode,
      others,
    )
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Course updated successfully',
      data,
    })
  }),
)
const getAllCourses = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = yield courses_services_1.courseServices.getAllCourse()
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Courses found successfully',
      data,
    })
  }),
)
const getCoursesOfTeacher = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.user
    const data =
      yield courses_services_1.courseServices.getCoursesOfTeacher(teacherId)
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'courses of the teacher retreived successfully',
      data,
    })
  }),
)
exports.courseControllers = {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getCoursesOfTeacher,
}
