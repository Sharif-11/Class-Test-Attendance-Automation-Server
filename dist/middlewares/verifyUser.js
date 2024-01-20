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
const http_status_1 = __importDefault(require('http-status'))
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const user_services_1 = require('../Services/user.services')
const config_1 = __importDefault(require('../config'))
const ApiError_1 = __importDefault(require('../errors/ApiError'))
const verifyUser = (...roles) => {
  const verifyUserMiddleware = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      var _a, _b
      const token =
        ((_a = req.headers.authorization) === null || _a === void 0
          ? void 0
          : _a.split(' ')[1]) ||
        ((_b = req === null || req === void 0 ? void 0 : req.cookies) ===
          null || _b === void 0
          ? void 0
          : _b.token)
      if (!token) {
        const errorResponse = {
          statusCode: 401,
          success: false,
          message: 'Token not provided',
        }
        res.status(401).json(errorResponse)
      } else {
        jsonwebtoken_1.default.verify(
          token,
          config_1.default.jwtSecret,
          (err, decoded) =>
            __awaiter(void 0, void 0, void 0, function* () {
              if (err) {
                const errorResponse = {
                  statusCode: 401,
                  success: false,
                  message: 'Invalid token',
                }
                res.status(401).json(errorResponse)
              } else {
                try {
                  const { role, id } = decoded
                  if (!roles.includes(role)) {
                    throw new ApiError_1.default(
                      http_status_1.default.UNAUTHORIZED,
                      `Only ${roles} can access this route`,
                    )
                  } else if (role === 'student') {
                    req.user =
                      yield user_services_1.userServices.getSingleStudent(id)
                  } else if (role === 'teacher') {
                    req.user =
                      yield user_services_1.userServices.getSingleTeacher(id)
                  }
                  next()
                } catch (error) {
                  next(error)
                }
              }
            }),
        )
      }
    })
  return verifyUserMiddleware
}
exports.default = verifyUser
