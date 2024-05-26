import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

// validate middleware
const validateRequest = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync({ body: req.body })
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
