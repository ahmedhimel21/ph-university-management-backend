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

// get all semester
const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

// get single semester
const getSingleSemesterFromDB = async (id: string) => {
  const result = AcademicSemester.findOne({ _id: id })
  return result
}

// update semester
const updateSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCode[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code')
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemester,
}
