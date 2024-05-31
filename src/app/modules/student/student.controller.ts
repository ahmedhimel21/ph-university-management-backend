import { studentServices } from './student.services'
import sendResponse from '../../utility/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsync'

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentServices.getSingleStudentDataFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  })
})

// update student
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body
  const result = await studentServices.updateStudentIntoDB(studentId, student)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  })
})

// delete student
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId
  const result = await studentServices.deleteStudentFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully deleted student',
    data: result,
  })
})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
