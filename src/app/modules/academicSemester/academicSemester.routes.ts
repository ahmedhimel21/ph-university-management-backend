import { Router } from 'express'
import { AcademicController } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterValidations } from './academicSemester.validation'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidations.academicSemesterValidationSchema),
  AcademicController.createAcademicSemester,
)

export const AcademicSemesterRoutes = router
