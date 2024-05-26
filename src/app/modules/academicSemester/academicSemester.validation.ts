import Joi from 'joi'

// Define the Joi validation schema for TMonth
const monthEnum = [
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
]

const TMonthSchema = Joi.string()
  .valid(...monthEnum)
  .required()

// Define the Joi validation schema for TAcademicSemester
const academicSemesterValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().valid('Autumn', 'Summer', 'Fall').required(),
    year: Joi.string().required(),
    code: Joi.string().valid('01', '02', '03').required(),
    startMonth: TMonthSchema,
    endMonth: TMonthSchema,
  }),
})

export const academicSemesterValidations = {
  academicSemesterValidationSchema,
}
