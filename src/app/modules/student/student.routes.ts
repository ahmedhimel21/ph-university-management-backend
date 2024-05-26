import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()

// get all students
router.get('/', StudentController.getAllStudent)

// get single student
router.get('/:studentId', StudentController.getSingleStudent)

// deleteStudent
router.delete('/:studentId', StudentController.deleteStudent)

export const studentRoutes = router
