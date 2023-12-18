import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', (req, res) => res.send('welcome'))

export default app
