import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const requiredFields = ['email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))))
  }
}
