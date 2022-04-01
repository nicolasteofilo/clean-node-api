import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { basRequest } from '../helpers/http-heler'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InValidParamsError } from '../errors/invalid-params-error'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return basRequest(new MissingParamError(fields))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return basRequest(new InValidParamsError('email'))
    }
  }
}
