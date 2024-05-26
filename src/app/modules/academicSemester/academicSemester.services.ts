import { academicSemesterNameCode } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check semester code for predefined semester
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
}
