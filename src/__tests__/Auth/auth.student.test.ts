import express from 'express'
import request from 'supertest'
import authRoutes from '../../Routes/auth.routes'
import { authServices } from '../../Services/auth.services'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

describe('POST /student/login', () => {
  afterEach(() => {
    jest.restoreAllMocks() // Reset all mocks after each test
  })
  it('should return 400 bad request for invalid input', async () => {
    const spy = jest.spyOn(authServices, 'studentLogin')
    const response = await request(app).post('/auth/student/login').send({})
    expect(spy).toHaveBeenCalledTimes(0)
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.data).toBeUndefined()
    expect(response.body.errorMessages).toBeTruthy()
  })
  it('should return 401 unauthorized for invalid credentials', async () => {
    const response = await request(app).post('/auth/student/login').send({
      studentId: '1804011',
      password: '123456',
    })
    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body).toHaveProperty('message', 'Invalid credentials')
  })

  it('should return 200 OK and a token on successful student login', async () => {
    // Mock the behavior of authServices.studentLogin

    const response = await request(app).post('/auth/student/login').send({
      studentId: '1804002',
      password: 'u1804002',
    })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveProperty('token')
  })

  // Add more test cases as needed
})

// Similar tests can be added for '/teacher/login'
