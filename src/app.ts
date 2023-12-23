import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import multer from 'multer'
import XLSX from 'xlsx'
import globalRoutes from './Routes/global.routes'
import globalErrorHandler from './middlewares/globalErrorHandler'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1', globalRoutes)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post(
  '/upload',
  upload.single('excelFile'),
  (req: Request, res: Response) => {
    const workbook = XLSX.read(req?.file?.buffer, { type: 'buffer' })
    const workSheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(workSheet)
    res.status(200).json(data)
  },
)
app.get('/', (req, res) => res.send('welcome'))
app.get('*', (req, res) => res.status(400).json({ message: 'no route found' }))
app.use(globalErrorHandler)
export default app
