import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'

const TMonthSchema = {
  type: String,
  enum: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  required: true,
}

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
    year: { type: String, required: true },
    code: { type: String, enum: ['01', '02', '03'], required: true },
    startMonth: TMonthSchema,
    endMonth: TMonthSchema,
  },
  { timestamps: true },
)

// check isSemester exists
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new Error('semester already exists')
  }
  next()
})

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
)

export default AcademicSemester
