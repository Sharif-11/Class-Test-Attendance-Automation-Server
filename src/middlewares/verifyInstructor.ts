import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import prisma from '../Shared/prisma'

const verifyInstructor: RequestHandler = async (req, res, next) => {
  const { teacherId } = req.user
  const { semesterId } = req.body || req.params
  const { courseCode } = req.body || req.params
  const isInstructor = await prisma.semester_Courses.findFirst({
    where: { teacherId, semesterId, courseCode },
  })
  if (isInstructor) {
    next()
  } else {
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'You are not a instructor of this course',
    }
    res.status(httpStatus.UNAUTHORIZED).json(errorResponse)
  }
}
export default verifyInstructor
