import { Router } from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

router.get('/:facultyId', AcademicFacultyControllers.getSpecificAcademicFaculty)

router.patch('/:facultyId', AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoutes = router
