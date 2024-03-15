import { Prisma } from '@prisma/client'
import { userServices } from '../../Services/user.services'
import prisma from '../../Shared/prisma'
import { studentSelect } from '../../Shared/utils'

beforeAll(async () => await prisma.student.deleteMany({}))
afterAll(async () => await prisma.student.deleteMany({}))
describe('createStudent()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // or jest.resetAllMocks();
  })
  const spy = jest.spyOn(prisma.student, 'create')
  it('should create a student when database is empty', async () => {
    const mockStudentData = {
      studentId: '1804001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      batch: '2018',
      session: '2018-2019',
      department: 'CSE',
      password: '123',
      profileImage: 'https://image1.jpg',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const { name, email, batch, session, department, profileImage, studentId } =
      mockStudentData
    const result = await userServices.createStudent(
      studentId,
      name,
      email,
      batch,
      session,
      profileImage,
      department,
      mockStudentData.password,
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, password, ...others } = mockStudentData
    expect(result).toMatchObject(others)
    expect(spy).toHaveBeenCalledTimes(1)
  })
  it('should raise error for duplicate student id', async () => {
    const mockStudentData = {
      studentId: '1804001',
      name: 'John Doe',
      email: 'john.does@example.com',
      batch: '2018',
      session: '2018-2019',
      department: 'CSE',
      password: '123',
      profileImage: 'https://image1.jpg',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const { name, email, batch, session, department, profileImage, studentId } =
      mockStudentData
    try {
      await userServices.createStudent(
        studentId,
        name,
        email,
        batch,
        session,
        profileImage,
        department,
        mockStudentData.password,
      )
    } catch (error) {
      expect(error instanceof Prisma.PrismaClientKnownRequestError).toBe(true)
    } finally {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({
        data: {
          studentId,
          name,
          email,
          batch,
          session,
          profileImage,
          department,
          password: mockStudentData.password,
          role: 'student',
        },
        select: studentSelect,
      })
    }
  })
  it('should raise error for duplicate email', async () => {
    const mockStudentData = {
      studentId: '1804002',
      name: 'John Doe',
      email: 'john.doe@example.com',
      batch: '2018',
      session: '2018-2019',
      department: 'CSE',
      password: '123',
      profileImage: 'https://image1.jpg',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const { name, email, batch, session, department, profileImage, studentId } =
      mockStudentData
    try {
      await userServices.createStudent(
        studentId,
        name,
        email,
        batch,
        session,
        profileImage,
        department,
        mockStudentData.password,
      )
    } catch (error) {
      expect(error instanceof Prisma.PrismaClientKnownRequestError).toBe(true)
    } finally {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({
        data: {
          studentId,
          name,
          email,
          batch,
          session,
          profileImage,
          department,
          password: mockStudentData.password,
          role: 'student',
        },
        select: studentSelect,
      })
    }
  })
  it('should create student with unique studentId and email', async () => {
    const mockStudentData = {
      studentId: '1804002',
      name: 'John Doe',
      email: 'u1804002@example.com',
      batch: '2018',
      session: '2018-2019',
      department: 'CSE',
      password: '123',
      profileImage: 'https://image1.jpg',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const { name, email, batch, session, department, profileImage, studentId } =
      mockStudentData
    try {
      const result = await userServices.createStudent(
        studentId,
        name,
        email,
        batch,
        session,
        profileImage,
        department,
        mockStudentData.password,
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, password, ...others } = mockStudentData
      expect(result).toMatchObject(others)
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({
        data: {
          studentId,
          name,
          email,
          batch,
          session,
          profileImage,
          department,
          password: mockStudentData.password,
          role: 'student',
        },
        select: studentSelect,
      })
    }
  })
})
