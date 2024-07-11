import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import globalRoutes from './Routes/global.routes'
import { nullifyTables } from './Services/utils.services'
import globalErrorHandler from './middlewares/globalErrorHandler'
import swaggerDocument from './swagger.json'
const app: Application = express()
app.use(express.json())
const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: function (origin: string | undefined, callback: any) {
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true, // Allow credentials
}

// Use CORS middleware
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', globalRoutes)

app.get('/', (req, res) => res.send('welcome'))
app.delete('/nullify', async (req, res) => {
  console.log({ a: 1 })
  await nullifyTables()
  res.end()
})
app.get('*', (req, res) => res.status(400).json({ message: 'no route found' }))
app.use(globalErrorHandler)
export default app
