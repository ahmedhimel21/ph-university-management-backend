import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import User from '../user/user.model'

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
  const result = await Student.findOne({ _id: id })
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
}
