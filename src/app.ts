import express, { Application } from 'express'
const app: Application = express()

app.get('/', (req, res) => {
  res.send('Welcome to backend')
})

export default app
