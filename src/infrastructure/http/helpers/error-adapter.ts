import { ApplicationError } from '../../../common/errors/application-error'
import { HTTPResponse } from '../../../contracts/http'
import {
  badRequest,
  notFound,
  serverError,
} from './http-helpers'

export function errorAdapter(error: any): HTTPResponse {
  if (error instanceof ApplicationError) {
    return {
      statusCode: error.statusCode,
      body: { message: error.message, name: error.name },
    }
  }

  return serverError(error)
}
