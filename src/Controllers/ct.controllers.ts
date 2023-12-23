import { Class_Test } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import XLSX from 'xlsx'
import { ExcelMark } from '../Interfaces/ClassTestMarks.interface'
import { classTestServices } from '../Services/ct.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'
const createCt = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const data = await classTestServices.createCt(req.body)
  console.log(data)
  sendSuccessResponse<Class_Test>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Test created successfully',
    data,
  })
})
const evaluateCt = catchAsync(async (req: Request, res: Response) => {
  const workbook = XLSX.read(req?.file?.buffer, { type: 'buffer' })
  const workSheet = workbook.Sheets[workbook.SheetNames[0]]
  const marksData: ExcelMark[] = XLSX.utils.sheet_to_json(workSheet)
  const uniqueStudentIds = new Set()
  const uniqueData = marksData.filter(entry => {
    if (!uniqueStudentIds.has(entry.studentId)) {
      uniqueStudentIds.add(entry.studentId)
      return true
    }
    return false
  })
  const { classTestId } = req.body
  const data = await classTestServices.evaluateCt(classTestId, uniqueData)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mark added successfully',
    data,
  })
  // res.status(200).json(marksData)
})
const getAllCtResult = catchAsync(async (req: Request, res: Response) => {
  const { semesterId, courseCode, studentId } = req.body
  const data = await classTestServices.getAllCtResult(
    semesterId,
    courseCode,
    studentId,
  )
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result of all class tests retreived successfully ',
    data,
  })
})
export const ctControllers = { createCt, evaluateCt, getAllCtResult }
