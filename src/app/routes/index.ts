import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.routes'
import { studentRoutes } from '../modules/student/student.routes'

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
]
// router.use('/users', userRoutes)
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
