/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ValidationError } from 'joi'
import { TErrorSources } from '../interface/error.interface'
import config from '../config'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something Went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]
  const joiValidationError = (err: ValidationError) => {
    statusCode = 400
    const errorSources: TErrorSources = err.details.map(detail => {
      return {
        path: detail.path[detail.path.length - 1],
        message: detail.message,
      }
    })
    return {
      statusCode,
      message: 'Validation error!',
      errorSources,
    }
  }
  if (err.isJoi) {
    const simplifiedError = joiValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
