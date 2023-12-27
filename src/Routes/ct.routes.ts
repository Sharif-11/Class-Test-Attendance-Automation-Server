import express from 'express'
import { ctControllers } from '../Controllers/ct.controllers'
import { ctValidators } from '../Validators/ct.validators'
import { multerConfig } from '../config/multer'
const ctRoutes = express.Router()

ctRoutes.post('/', ctValidators.validateCreateCt, ctControllers.createCt)
ctRoutes.post(
  '/evaluate-ct/:classTestId',
  multerConfig.uploadExcel.single('excelFile'),
  ctValidators.validateEvaluateCt,
  ctControllers.evaluateCt,
)
ctRoutes.get(
  '/results/:studentId',
  ctValidators.validateGetAllCtResult,
  ctControllers.getAllCtResult,
)
ctRoutes.get(
  '/teacher-ct/:courseCode',
  ctValidators.validateGetAllCt,
  ctControllers.getAllCt,
)
ctRoutes.get(
  '/final-result/:courseCode',
  ctValidators.validateCalculateFinalResult,
  ctControllers.calculateFinalResult,
)
ctRoutes.get(
  '/ct-result/:classTestId',
  ctValidators.validateGetCtResultForTeacher,
  ctControllers.getCtResultForTeacher,
)
export default ctRoutes
