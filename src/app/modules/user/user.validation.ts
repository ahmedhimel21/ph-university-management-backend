import Joi from 'joi'

const userValidationSchema = Joi.object({
  password: Joi.string().optional().messages({
    'string.base': '"password" should be a type of string',
    'any.required': '"password" is a required field',
  }),
})

export default userValidationSchema
