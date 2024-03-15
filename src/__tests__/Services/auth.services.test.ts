/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { authServices } from '../../Services/auth.services'
import * as utilsServices from '../../Services/utils.services'
import prisma from '../../Shared/prisma'
import ApiError from '../../errors/ApiError'
describe('Student Login', () => {
  const findUniqueMock = jest.spyOn(prisma.student, 'findUnique')
  const comparePasswordsMock = jest.spyOn(utilsServices, 'comparePasswords')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Returns the student if it exists in the database for correct credentials', async () => {
    const inputData = { studentId: '1804001', password: '123456' }
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

    findUniqueMock.mockResolvedValue({
      studentId: '1804001',
      name: 'Anirban Barua',
      email: 'u1804001@student.cuet.ac.bd',
      batch: '2018',
      session: '2018-2019',
      role: 'student',
      createdAt: new Date('2024-01-27 10:46:29.943'),
      profileImage:
        'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
      password: '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
      department: 'CSE',
      updatedAt: new Date('2024-01-27 10:46:29.943'),
    })

    comparePasswordsMock.mockReturnValue(true)

    const result = await authServices.studentLogin(
      inputData.studentId,
      inputData.password,
    )

    expect(result).toMatchObject(output)
    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { studentId: inputData.studentId },
    })
    expect(utilsServices.comparePasswords).toHaveBeenCalledWith(
      inputData.password,
      '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
    )
  })

  it('Throws Unauthorized Error for Nonexistent Student', async () => {
    const inputData = { studentId: '1804035', password: '123456' }

    findUniqueMock.mockResolvedValue(null)

    await expect(
      authServices.studentLogin(inputData.studentId, inputData.password),
    ).rejects.toEqual(
      new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials'),
    )

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { studentId: inputData.studentId },
    })
    expect(utilsServices.comparePasswords).not.toHaveBeenCalled()
  })

  it('Throws Unauthorized Error for Valid Student Id but Wrong Password', async () => {
    const inputData = { studentId: '1804001', password: '1234567' }

    findUniqueMock.mockResolvedValue({
      studentId: '1804001',
      name: 'Anirban Barua',
      email: 'u1804001@student.cuet.ac.bd',
      batch: '2018',
      session: '2018-2019',
      role: 'student',
      createdAt: new Date('2024-01-27 10:46:29.943'),
      profileImage:
        'https://res.cloudinary.com/dqnw5qaoq/image/upload/v1706352389/jkgnsx6zl0d1ieiqwlvr.webp',
      password: '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
      department: 'CSE',
      updatedAt: new Date('2024-01-27 10:46:29.943'),
    })

    comparePasswordsMock.mockReturnValue(false)

    await expect(
      authServices.studentLogin(inputData.studentId, inputData.password),
    ).rejects.toEqual(
      new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials'),
    )

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { studentId: inputData.studentId },
    })
    expect(utilsServices.comparePasswords).toHaveBeenCalledWith(
      inputData.password,
      '$2b$12$Jzn7FB0rrfm.9KPxPzbyvOs5Cxml.QlQ0GVVVnJO68RP3poe0nBYq',
    )
  })

  // Add more test cases for error scenarios, edge cases, and security concerns as needed.
})
