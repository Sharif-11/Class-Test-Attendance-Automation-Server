import { Teacher } from '@prisma/client'
import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { ErrorResponse } from '../Interfaces/responses.interfaces'
import prisma from '../Shared/prisma'

const verifyHead: RequestHandler = async (req, res, next) => {
  const { user } = req
  const { teacherId } = user as Partial<Teacher>
  const currentHead = await prisma.teacher.findFirst({
    where: { teacherId, deptHead: true },
  })
  if (!currentHead) {
    const errorResponse: ErrorResponse = {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Only head can access the route',
    }
    res.status(httpStatus.UNAUTHORIZED).json(errorResponse)
  } else {
    next()
  }
}
export default verifyHead
