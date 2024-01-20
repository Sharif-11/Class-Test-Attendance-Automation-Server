'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_validator_1 = require('express-validator')
const http_status_1 = __importDefault(require('http-status'))
const validationErrorHandler = message => {
  const middleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req)
    const statusCode = http_status_1.default.BAD_REQUEST
    const success = false
    const errorMessages = []
    if (!errors.isEmpty()) {
      for (const error of errors.array()) {
        if (error.type === 'field') {
          const { msg, path } = error
          errorMessages.push({ path, message: msg })
        }
      }
      res
        .status(http_status_1.default.BAD_REQUEST)
        .json({ statusCode, success, message, errorMessages })
    } else {
      next()
    }
  }
  return middleware
}
exports.default = validationErrorHandler
