import Joi, { ObjectSchema } from 'joi'

const nameValidationSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': '"firstName" should be a type of string',
    'any.required': '"firstName" is a required field',
  }),
  lastName: Joi.string().required().messages({
    'string.base': '"lastName" should be a type of string',
    'any.required': '"lastName" is a required field',
  }),
})

const guardianValidationSchema: ObjectSchema = Joi.object({
  fathersName: Joi.string().required().messages({
    'string.base': '"fathersName" should be a type of string',
    'any.required': '"fathersName" is a required field',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': '"fatherOccupation" should be a type of string',
    'any.required': '"fatherOccupation" is a required field',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': '"fatherContactNo" should be a type of string',
    'any.required': '"fatherContactNo" is a required field',
  }),
  mothersName: Joi.string().required().messages({
    'string.base': '"mothersName" should be a type of string',
    'any.required': '"mothersName" is a required field',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': '"motherOccupation" should be a type of string',
    'any.required': '"motherOccupation" is a required field',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': '"motherContactNo" should be a type of string',
    'any.required': '"motherContactNo" is a required field',
  }),
})

const localGuardianValidationSchema: ObjectSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" should be a type of string',
    'any.required': '"name" is a required field',
  }),
  occupation: Joi.string().required().messages({
    'string.base': '"occupation" should be a type of string',
    'any.required': '"occupation" is a required field',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': '"contactNo" should be a type of string',
    'any.required': '"contactNo" is a required field',
  }),
  address: Joi.string().required().messages({
    'string.base': '"address" should be a type of string',
    'any.required': '"address" is a required field',
  }),
})

const createStudentValidationSchema: ObjectSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().max(20).required().messages({
      'string.base': '"password" should be a type of string',
      'string.max': '"password" should not exceed 20 characters',
      'any.required': '"password" is a required field',
    }),
    student: Joi.object({
      name: nameValidationSchema.required().messages({
        'any.required': '"name" is a required field',
      }),
      gender: Joi.string()
        .valid('Male', 'Female', 'Other')
        .required()
        .messages({
          'string.base': '"gender" should be a type of string',
          'any.only': '"gender" must be one of [Male, Female, Other]',
        }),
      dateOfBirth: Joi.string().optional().messages({
        'string.base': '"dateOfBirth" should be a type of string',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'AB+', 'AB-', 'O+', 'O-')
        .optional()
        .messages({
          'string.base': '"bloodGroup" should be a type of string',
          'any.only': '"bloodGroup" must be one of [A+, A-, AB+, AB-, O+, O-]',
        }),
      presentAddress: Joi.string().required().messages({
        'string.base': '"presentAddress" should be a type of string',
        'any.required': '"presentAddress" is a required field',
      }),
      permanentAddress: Joi.string().required().messages({
        'string.base': '"permanentAddress" should be a type of string',
        'any.required': '"permanentAddress" is a required field',
      }),
      guardian: guardianValidationSchema.required().messages({
        'any.required': '"guardian" is a required field',
      }),
      localGuardian: localGuardianValidationSchema.required().messages({
        'any.required': '"localGuardian" is a required field',
      }),
      admissionSemester: Joi.string(),
      profileImage: Joi.string().optional().messages({
        'string.base': '"profileImage" should be a type of string',
      }),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
}
