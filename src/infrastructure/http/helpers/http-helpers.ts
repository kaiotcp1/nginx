// src/presenter/helpers/http-helpers.ts

import { HTTPResponse } from "../../../contracts/http"

export const ok = <T>(data: T): HTTPResponse => ({
  statusCode: 200,
  body: data,
})

export const created = <T>(data: T): HTTPResponse => ({
  statusCode: 201,
  body: data,
})

export const deleted = <T>(data: T): HTTPResponse => ({
  statusCode: 204,
  body: data,
})

export const badRequest = (error: any): HTTPResponse => ({
  statusCode: 400,
  body: { message: error.message, name: error.name },
})

export const notFound = (error: any): HTTPResponse => ({
  statusCode: 404,
  body: { message: error.message, name: error.name },
})

export const serverError = (error: any): HTTPResponse => ({
  statusCode: 500,
  body: { message: 'Internal server error', detail: error.message },
})
