import { ValidationError } from 'joi'
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface'

const joiValidationErrorHandler = (
  err: ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400
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
export default joiValidationErrorHandler
