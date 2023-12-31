import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import prisma from '../Shared/prisma'

const verifyCtPermission: RequestHandler = async (req, res, next) => {
  const { classTestId } = req.params || req.body
  const { teacherId } = req.user
  const existingCt = await prisma.class_Test.findFirst({
    where: { classTestId },
  })

  const isInstructor = await prisma.semester_Courses.findFirst({
    where: {
      teacherId,
      semesterId: existingCt?.semesterId,
      courseCode: existingCt?.courseCode,
    },
  })
  if (isInstructor) {
    next()
  } else {
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'You are not permitted to access this ct',
    }
    res.status(httpStatus.UNAUTHORIZED).json(errorResponse)
  }
}
export default verifyCtPermission
