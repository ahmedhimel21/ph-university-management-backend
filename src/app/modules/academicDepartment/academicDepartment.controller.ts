import { Request, Response } from 'express'
import catchAsync from '../../utility/catchAsync'
import { AcademicDepartmentServices } from './academicDepartment.service'
import sendResponse from '../../utility/sendResponse'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { academicDepartment } = req.body
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
        academicDepartment,
      )
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department has been created successfully',
      data: result,
    })
  },
)

// get all academic department
const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Departments retrieved successfully',
      data: result,
    })
  },
)

// get specific department
const getSpecifDepartment = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = req.params
  const result =
    await AcademicDepartmentServices.getSpecifDepartmentFromDB(departmentId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department retrieved successfully',
    data: result,
  })
})

// update department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = req.params
  const { academicDepartment } = req.body
  const result = await AcademicDepartmentServices.updateDepartment(
    departmentId,
    academicDepartment,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSpecifDepartment,
  updateDepartment,
}
