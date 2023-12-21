import express from 'express'
import { authControllers } from '../Controllers/auth.controllers'
import { userControllers } from '../Controllers/user.controllers'
const studentRoutes = express.Router()
studentRoutes.post('/signup', userControllers.createStudent)
studentRoutes.post('/login', authControllers.studentLogin)

export default studentRoutes
