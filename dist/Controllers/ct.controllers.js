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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ctControllers = void 0
const http_status_1 = __importDefault(require('http-status'))
const xlsx_1 = __importDefault(require('xlsx'))
const ct_services_1 = require('../Services/ct.services')
const response_services_1 = require('../Services/response.services')
const catchAsync_1 = __importDefault(require('../Shared/catchAsync'))
const createCt = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId, courseCode, full_mark } = req.body
    const data = yield ct_services_1.classTestServices.createCt(
      semesterId,
      courseCode,
      full_mark,
    )
    console.log(data)
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Class Test created successfully',
      data,
    })
  }),
)
const getAllCt = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.body
    const { courseCode } = req.params
    const data = yield ct_services_1.classTestServices.getAllCt(
      semesterId,
      courseCode,
    )
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Class tests of the course retreived successfully',
      data,
    })
  }),
)
const evaluateCt = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a
    const workbook = xlsx_1.default.read(
      (_a = req === null || req === void 0 ? void 0 : req.file) === null ||
        _a === void 0
        ? void 0
        : _a.buffer,
      { type: 'buffer' },
    )
    const workSheet = workbook.Sheets[workbook.SheetNames[0]]
    const marksData = xlsx_1.default.utils.sheet_to_json(workSheet)
    const uniqueStudentIds = new Set()
    const uniqueData = marksData.filter(entry => {
      if (!uniqueStudentIds.has(entry.studentId)) {
        uniqueStudentIds.add(entry.studentId)
        return true
      }
      return false
    })
    const { classTestId } = req.params
    const data = yield ct_services_1.classTestServices.evaluateCt(
      classTestId,
      uniqueData,
    )
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Mark added successfully',
      data,
    })
    // res.status(200).json(marksData)
  }),
)
const getAllCtResult = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId, courseCode } = req.body
    const { studentId } = req.user
    const data = yield ct_services_1.classTestServices.getAllCtResult(
      semesterId,
      courseCode,
      studentId,
    )
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Result of all class tests retreived successfully ',
      data,
    })
  }),
)
const getCtResultForTeacher = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { classTestId } = req.params
    const data =
      yield ct_services_1.classTestServices.getCtResultForTeacher(classTestId)
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Result of a class test for teacher retreived successfully ',
      data,
    })
  }),
)
const calculateFinalResult = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode } = req.params
    const { semesterId } = req.body
    const data = yield ct_services_1.classTestServices.calculateFinalResult(
      semesterId,
      courseCode,
    )
    ;(0, response_services_1.sendSuccessResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Final result of the class test calculated successfully',
      data,
    })
  }),
)
exports.ctControllers = {
  createCt,
  evaluateCt,
  getAllCtResult,
  getAllCt,
  getCtResultForTeacher,
  calculateFinalResult,
}
