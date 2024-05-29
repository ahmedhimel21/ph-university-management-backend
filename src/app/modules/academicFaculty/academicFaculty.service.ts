import { TAcademicFaculty } from './academicFaculty.interface'
import AcademicFacultyModel from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = AcademicFacultyModel.create(payload)
  return result
}

// get all academic faculty
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFacultyModel.find()
  return result
}

// get specific academic faculty
const getSpecificAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: id })
  return result
}

// update academic faculty
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSpecificAcademicFacultyFromDB,
  updateAcademicFaculty,
}
