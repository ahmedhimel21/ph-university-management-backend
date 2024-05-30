import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utility'
import AppError from '../../errors/AppError'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const session = await mongoose.startSession()
  try {
    //start transaction
    session.startTransaction()
    // creating user
    const createUser: Partial<TUser> = {}
    // add password
    createUser.password = password || config.default_pass
    // add role
    createUser.role = 'student'

    // find academic semester
    const admissionSemester = await AcademicSemester.findById(
      studentData.admissionSemester,
    )
    // add generated id
    createUser.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    )
    // creating user(transaction-1)
    const newUser = await User.create([createUser], { session })

    // create student
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user!')
    }
    studentData.id = newUser[0].id
    studentData.user = newUser[0]._id

    // creating student(transaction-2)
    const newStudent = await Student.create([studentData], { session })
    if (!newStudent.length) {
      throw new Error('Failed to create student!')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}
export const UserServices = {
  createStudentIntoDB,
}
