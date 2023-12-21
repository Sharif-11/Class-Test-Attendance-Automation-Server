import { Prisma } from '@prisma/client'
import { ErrorRequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import ApiError from '../errors/ApiError'
import { knownRequestHandler } from './prismaErrorHandler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    const errorResponse: ErrorResponse = {
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
    res.status(400).json(errorResponse)
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { message, path } = knownRequestHandler(error)
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message,
      errorMessages: [{ message, path }],
    }
    res.status(httpStatus.BAD_REQUEST).json(errorResponse)
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'invalid value for some fields',
      errorMessages: [
        {
          path: '',
          message: '',
        },
      ],
    })
  } else {
    res.status(400).json({
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
      errorMessages: [
        {
          path: '',
          message: error.message,
        },
      ],
    })
  }
}
export default globalErrorHandler
