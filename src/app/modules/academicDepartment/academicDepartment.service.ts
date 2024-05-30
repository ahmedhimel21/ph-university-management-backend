import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartmentModel from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload)
  return result
}

// get all departments
const getAllAcademicDepartmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty')
  return result
}

// get specific department
const getSpecifDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById({ _id: id }).populate(
    'academicFaculty',
  )
  return result
}

// update department
const updateDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSpecifDepartmentFromDB,
  updateDepartment,
}
