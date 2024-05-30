import { Student } from './student.model'

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
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentDataFromDB,
  deleteStudentFromDB,
}
