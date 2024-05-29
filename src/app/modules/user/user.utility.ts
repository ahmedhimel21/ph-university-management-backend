import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  //2025 01 0001
  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString() // 0000 by default

  const lastStudentId = await findLastStudentId() //2025 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(6) //01
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4) // 2025
  const currentStudentSemesterCode = payload.code //01
  const currentStudentSemesterYear = payload.year //2025
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear === currentStudentSemesterYear
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
