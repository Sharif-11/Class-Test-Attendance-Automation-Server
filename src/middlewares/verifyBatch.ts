import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import { StudentWithoutPassword } from '../Interfaces/user.interface'

const verifyBatch: RequestHandler = async (req, res, next) => {
  const { batch } = req.user as StudentWithoutPassword
  const semesterBatch =
    req.params?.semesterId?.substring(0, 4) ||
    req.body?.semesterId?.substring(0, 4)
  if (batch === semesterBatch) {
    next()
  } else {
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: `You are not a student of batch ${semesterBatch.toString()}`,
    }
    res.status(httpStatus.UNAUTHORIZED).json(errorResponse)
  }
}
export default verifyBatch
