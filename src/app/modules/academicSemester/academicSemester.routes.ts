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

// get all semester
router.get('/', AcademicController.getSemester)

// get single semester
router.get('/:semesterId', AcademicController.getSingleSemester)

// update semester
router.patch('/:semesterId', AcademicController.updateSemester)

export const AcademicSemesterRoutes = router
