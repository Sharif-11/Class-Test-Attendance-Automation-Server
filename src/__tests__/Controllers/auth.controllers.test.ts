import httpStatus from 'http-status'
import request from 'supertest'
import { authServices } from '../../Services/auth.services'
import * as utilityServices from '../../Services/utils.services'
import app from '../../app'
import ApiError from '../../errors/ApiError'
jest.mock('../../Services/auth.services.ts')
jest.mock('../../Services/utils.services')
describe('Student Login Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should log in a student and return a token', async () => {
    const mockedStudentLogin = jest.fn()
    const mockedGenerateToken = jest.spyOn(utilityServices, 'generateToken')
    const mockedToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MDQwMDEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcwNjg2MTE1MSwiZXhwIjoxNzM4NDE4NzUxfQ.kgjf1udmgoj9wCwC34slMzA70yvUgh1lohyTrjAz2Jc'
    const output = {
      studentId: '1804001',
      name: 'Anirban Barua',
      email: 'u1804001@student.cuet.ac.bd',
      batch: '2018',
      session: '2018-2019',
      role: 'student',
      profileImage:
        'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
      department: 'CSE',
    }
    authServices.studentLogin = mockedStudentLogin.mockResolvedValue({
      studentId: '1804001',
      name: 'Anirban Barua',
      email: 'u1804001@student.cuet.ac.bd',
      batch: '2018',
      session: '2018-2019',
      role: 'student',
      createdAt: new Date('2024-01-27 10:46:29.943'),
      profileImage:
        'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
      department: 'CSE',
      updatedAt: new Date('2024-01-27 10:46:29.943'),
    })
    mockedGenerateToken.mockReturnValue(mockedToken)
    const response = await request(app).post('/api/v1/student/login').send({
      studentId: '1804001',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.token).toBe(mockedToken)
    expect(response.body.data.password).toBeUndefined()
    expect(response.body.data).toMatchObject(output)
    expect(authServices.studentLogin).toHaveBeenCalledWith('1804001', '123456')

    // Verify that generateToken was called with the correct arguments
    expect(utilityServices.generateToken).toHaveBeenCalledWith(
      '1804001',
      'student',
    )
    expect(response.header['set-cookie']).toBeDefined()

    // You can add more specific assertions based on your cookie settings
    const cookie = response.header['set-cookie'][0]
    expect(cookie).toContain(`token=${mockedToken}`)
    expect(cookie).toContain('HttpOnly')
    // expect(cookie).toContain(`Max-Age=${30 * 24 * 3600}`)
  })
  it('should return error response for invalid credentials', async () => {
    const mockedStudentLogin = jest.fn()
    authServices.studentLogin = mockedStudentLogin.mockRejectedValue(
      new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials'),
    )
    const response = await request(app).post('/api/v1/student/login').send({
      studentId: '1804035',
      password: '123456',
    })
    // console.log(response)
    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.data).toBeUndefined()
    expect(authServices.studentLogin).rejects.toThrow()
    expect(utilityServices.generateToken).toHaveBeenCalledTimes(0)
    expect(response.header['set-cookie']).toBeUndefined()
  })
})
