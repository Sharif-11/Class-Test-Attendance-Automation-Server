import express from 'express'
import multer from 'multer'
import { ctControllers } from '../Controllers/ct.controllers'
const ctRoutes = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
ctRoutes.post('/', ctControllers.createCt)
ctRoutes.post(
  '/evaluate-ct',
  upload.single('excelFile'),
  ctControllers.evaluateCt,
)
export default ctRoutes
