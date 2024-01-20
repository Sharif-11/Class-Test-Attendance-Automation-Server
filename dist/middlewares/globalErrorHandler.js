'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const client_1 = require('@prisma/client')
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../errors/ApiError'))
const prismaErrorHandler_1 = require('./prismaErrorHandler')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
  if (error instanceof ApiError_1.default) {
    const errorResponse = {
      statusCode: error.statusCode,
      success: false,
      message: error.message,
      errorMessages: [
        {
          path: '',
          message: error.message,
        },
      ],
      stack: error.stack,
    }
    res.status(error.statusCode).json(errorResponse)
  } else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
    const { message, path } = (0, prismaErrorHandler_1.knownRequestHandler)(
      error,
    )
    const errorResponse = {
      statusCode: http_status_1.default.BAD_REQUEST,
      success: false,
      message,
      errorMessages: [{ message, path }],
      stack: error === null || error === void 0 ? void 0 : error.stack,
    }
    res.status(http_status_1.default.BAD_REQUEST).json(errorResponse)
  } else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
    const errorResponse = {
      statusCode: http_status_1.default.BAD_REQUEST,
      success: false,
      message: 'Prisma validation errors',
      errorMessages: [
        {
          path: '',
          message: error === null || error === void 0 ? void 0 : error.message,
        },
      ],
      stack: error === null || error === void 0 ? void 0 : error.stack,
    }
    res.status(400).json(errorResponse)
  } else {
    const errorResponse = {
      statusCode: http_status_1.default.BAD_REQUEST,
      success: false,
      message: error.message,
      errorMessages: [
        {
          path: '',
          message: error.message,
        },
      ],
    }
    res.status(400).json(errorResponse)
  }
}
exports.default = globalErrorHandler
