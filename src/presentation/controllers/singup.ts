import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { basRequest } from '../helpers/http-heler'
import { Controller } from '../protocols/controller'

export class SingUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return basRequest(new MissingParamError(fields))
      }
    }
  }
}
