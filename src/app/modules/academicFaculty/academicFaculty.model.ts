import { model, Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
)

const AcademicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
)

export default AcademicFacultyModel
