import { Prisma } from '@prisma/client'
import { ErrorRequestHandler } from 'express'
import ErrorResponse from '../Interfaces/error.interfaces'
import ApiError from '../errors/ApiError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    const errorResponse: ErrorResponse = {
      status: false,
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
    res.status(400).json(error)
  }
}
export default globalErrorHandler
