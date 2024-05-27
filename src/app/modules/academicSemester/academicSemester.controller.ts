import { AcademicSemesterServices } from './academicSemester.services'
import httpStatus from 'http-status'
import sendResponse from '../../utility/sendResponse'
import catchAsync from '../../utility/catchAsync'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester has been created successfully',
    data: result,
  })
})

// get all academic semester
const getSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemesterFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    data: result,
  })
})

// get single semester
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result =
    await AcademicSemesterServices.getSingleSemesterFromDB(semesterId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully!',
    data: result,
  })
})

// update semester
const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateSemester(
    semesterId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester data updated successfully!',
    data: result,
  })
})

export const AcademicController = {
  createAcademicSemester,
  getSemester,
  getSingleSemester,
  updateSemester,
}
