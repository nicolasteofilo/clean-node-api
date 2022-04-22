import { HttpResponse } from '../../protocols/'
import { ServerError, UnauthorizedError } from '../../errors/'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const ok = (data: any, statusCode = 200): HttpResponse => ({
  statusCode: statusCode,
  body: data,
})
