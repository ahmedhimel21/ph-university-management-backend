import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.routes'
import { studentRoutes } from '../modules/student/student.routes'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
]
// router.use('/users', userRoutes)
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
