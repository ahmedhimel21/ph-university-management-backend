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

export const AcademicController = {
  createAcademicSemester,
}
