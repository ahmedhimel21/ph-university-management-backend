import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

// department exists validation with pre hook middleware
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  })
  if (isDepartmentExists) {
    throw new Error('Academic Department already exist!')
  }
  next()
})

// update validation
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExists = await AcademicDepartmentModel.findOne(query)
  if (!isDepartmentExists) {
    throw new Error('Department does not exist!')
  }
  next()
})

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
)

export default AcademicDepartmentModel
