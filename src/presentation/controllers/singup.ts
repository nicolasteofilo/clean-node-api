import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { basRequest } from '../helpers/http-heler'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return basRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return basRequest(new MissingParamError('email'))
    }
  }
}
