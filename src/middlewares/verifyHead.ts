import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import prisma from '../Shared/prisma'

const verifyHead: RequestHandler = async (req, res, next) => {
  const { user } = req
  const { id } = user
  const currentHead = await prisma.teacher.findFirst({
    where: { teacherId: id, deptHead: true },
  })
  if (!currentHead) {
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'The teacher with this id is not the head of department',
    }
    res.status(httpStatus.UNAUTHORIZED).json(errorResponse)
  } else {
    next()
  }
}
export default verifyHead
