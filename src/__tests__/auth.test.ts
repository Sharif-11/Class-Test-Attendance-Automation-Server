import express from 'express'
import request from 'supertest'
import authRoutes from '../Routes/auth.routes'
import { authServices } from '../Services/auth.services'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

describe('POST /student/login', () => {
  afterEach(() => {
    jest.restoreAllMocks() // Reset all mocks after each test
  })

  it('should return 200 OK and a token on successful student login', async () => {
    // Mock the behavior of authServices.studentLogin
    jest.spyOn(authServices, 'studentLogin').mockResolvedValue({
      studentId: '1804002',
      name: 'Tanvir Rahman',
      email: 'u1804002@student.cuet.ac.bd',
      batch: '2018',
      session: '2018-2019',
      department: 'CSE',
      role: 'student',
      createdAt: new Date('2023-12-24 08:47:27.444'),
      updatedAt: new Date('2023-12-24 08:47:27.444'),
      profileImage:
        'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1703407645/yh20sfqfqogyqcr2sngb.webp',
      // Add other fields as needed
    })

    const response = await request(app).post('/auth/student/login').send({
      studentId: '1804002',
      password: 'u1804002',
    })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveProperty('token')
  })

  // Add more test cases as needed
})

// Similar tests can be added for '/teacher/login'
