import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import AcademicSemester from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utility'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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
  const newUser = await User.create(createUser)

  // create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id
    // creating student
    const newStudent = await Student.create(studentData)
    return newStudent
  }
}
export const UserServices = {
  createStudentIntoDB,
}
