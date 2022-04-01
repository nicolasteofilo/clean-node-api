import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { basRequest } from '../helpers/http-heler'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return basRequest(new MissingParamError(fields))
      }
    }
  }
}
