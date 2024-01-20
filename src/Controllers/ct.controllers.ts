import { Class_Test } from '@prisma/client'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import XLSX from 'xlsx'
import { ExcelMark } from '../Interfaces/ClassTestMarks.interface'
import { StudentWithoutPassword } from '../Interfaces/user.interface'
import { classTestServices } from '../Services/ct.services'
import { sendSuccessResponse } from '../Services/response.services'
import catchAsync from '../Shared/catchAsync'
const createCt = catchAsync(async (req: Request, res: Response) => {
  const { semesterId, courseCode, full_mark } = req.body
  const data = await classTestServices.createCt(
    semesterId,
    courseCode,
    Number(full_mark),
  )
  console.log(data)
  sendSuccessResponse<Class_Test>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Test created successfully',
    data,
  })
})
const getAllCt = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params
  const { courseCode } = req.params
  const data = await classTestServices.getAllCt(semesterId, courseCode)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class tests of the course retreived successfully',
    data,
  })
})
const evaluateCt = catchAsync(async (req: Request, res: Response) => {
  const workbook = XLSX.read(req?.file?.buffer, { type: 'buffer' })
  console.log({ workbook })
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
  const { classTestId } = req.params
  console.log({ classTestId })
  const data = await classTestServices.evaluateCt(classTestId, uniqueData)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mark added successfully',
    data,
  })
  // res.status(200).json(marksData)
})
const cancelEvaluation = catchAsync(async (req: Request, res: Response) => {
  const { classTestId } = req.params
  const data = await classTestServices.cancelEvaluation(classTestId)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Evaluation cancelled successfully',
    data,
  })
})
const deleteCt = catchAsync(async (req: Request, res: Response) => {
  const { classTestId } = req.params
  const data = await classTestServices.deleteCt(classTestId)
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class Test deleted successfully',
    data,
  })
})
const getAllCtResult = catchAsync(async (req: Request, res: Response) => {
  const { semesterId, courseCode } = req.body
  const { studentId } = req.user as StudentWithoutPassword
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
const getCtResultForTeacher = catchAsync(
  async (req: Request, res: Response) => {
    const { classTestId } = req.params
    const data = await classTestServices.getCtResultForTeacher(classTestId)
    sendSuccessResponse<typeof data>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Result of a class test for teacher retreived successfully ',
      data,
    })
  },
)
const calculateFinalResult = catchAsync(async (req: Request, res: Response) => {
  const { courseCode } = req.params
  const { semesterId } = req.body
  const data = await classTestServices.calculateFinalResult(
    semesterId,
    courseCode,
  )
  sendSuccessResponse<typeof data>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Final result of the class test calculated successfully',
    data,
  })
})
export const ctControllers = {
  createCt,
  evaluateCt,
  getAllCtResult,
  getAllCt,
  getCtResultForTeacher,
  calculateFinalResult,
  cancelEvaluation,
  deleteCt,
}
