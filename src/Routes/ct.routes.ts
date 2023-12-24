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
export default ctRoutes
