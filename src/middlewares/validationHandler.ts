import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import httpStatus from 'http-status'
import { ErrorMessage } from '../Interfaces/responses.interfaces'

const validationErrorHandler = (message: string) => {
  const middleware: RequestHandler = (req, res, next) => {
    const errors = validationResult(req)

    const statusCode = httpStatus.BAD_REQUEST
    const success = false
    const errorMessages: ErrorMessage[] = []
    if (!errors.isEmpty()) {
      for (const error of errors.array()) {
        console.log(error)
        const { path, msg } = error
        errorMessages.push({ path, message: msg })
      }
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ statusCode, success, message, errorMessages })
    } else {
      next()
    }
  }
  return middleware
}
export default validationErrorHandler
