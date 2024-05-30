import { Router } from 'express'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = Router()

router.post(
  '/create-department',
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)

router.get('/:departmentId', AcademicDepartmentControllers.getSpecifDepartment)

router.patch('/:departmentId', AcademicDepartmentControllers.updateDepartment)

export const AcademicDepartmentRoutes = router
