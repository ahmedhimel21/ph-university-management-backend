/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { TErrorSources } from '../interface/error.interface'
import config from '../config'
import joiValidationErrorHandler from '../errors/joiValidationHandler'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something Went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]
  if (err.isJoi) {
    const simplifiedError = joiValidationErrorHandler(err)
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
