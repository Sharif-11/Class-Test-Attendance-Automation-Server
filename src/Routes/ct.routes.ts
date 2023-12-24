import express from 'express'
import { ctControllers } from '../Controllers/ct.controllers'
import { multerConfig } from '../config/multer'
const ctRoutes = express.Router()

ctRoutes.post('/', ctControllers.createCt)
ctRoutes.post(
  '/evaluate-ct',
  multerConfig.uploadExcel.single('excelFile'),
  ctControllers.evaluateCt,
)
ctRoutes.get('/results/:studentId', ctControllers.getAllCtResult)
ctRoutes.get('/teacher-ct/:courseCode', ctControllers.getAllCt)
ctRoutes.get('/ct-result/:classTestId', ctControllers.getCtResultForTeacher)
export default ctRoutes
