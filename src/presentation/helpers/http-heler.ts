import { HttpResponse } from '../protocols/http'

export const basRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)
