import { Request, Response } from 'express'
import catchAsync from '../../utility/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.service'
import sendResponse from '../../utility/sendResponse'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { academicFaculty } = req.body
    const result =
      await AcademicFacultyServices.createAcademicFacultyIntoDB(academicFaculty)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty has been created successfully!',
      data: result,
    })
  },
)

// get all academic faculty
const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculties retrieved successfully!',
      data: result,
    })
  },
)

// get specific academic faculty
const getSpecificAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const result =
      await AcademicFacultyServices.getSpecificAcademicFacultyFromDB(facultyId)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty retrieved successfully!',
      data: result,
    })
  },
)

// update faculty
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const { academicFaculty } = req.body
    const result = await AcademicFacultyServices.updateAcademicFaculty(
      facultyId,
      academicFaculty,
    )
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty updated successfully!',
      data: result,
    })
  },
)

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSpecificAcademicFaculty,
  updateAcademicFaculty,
}
