'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendSuccessResponse = void 0
const sendSuccessResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null || undefined,
  }
  res.status(data.statusCode).json(responseData)
}
exports.sendSuccessResponse = sendSuccessResponse
