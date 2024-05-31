import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import User from '../user/user.model'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  // const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

// update student
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // first-step: distinguish primitive and non primitive type data
  const { name, guardian, localGuardian, ...remainingNonPrimitiveData } =
    payload
  // second step: modified object
  const modifiedData: Record<string, unknown> = { ...remainingNonPrimitiveData }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedData[`name.${key}`] = value
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian))
      modifiedData[`guardian.${key}`] = value
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian))
      modifiedData[`localGuardian.${key}`] = value
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
  })
  return result
}

// delete
const deleteStudentFromDB = async (id: string) => {
  if (!(await Student.isExistUser(id))) {
    throw new AppError(404, 'Student not found')
  }
  // start session
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // delete student (transaction-1)
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student')
    }
    // delete user (transaction-2)
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user!')
    }
    // commit and end transaction
    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentDataFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
