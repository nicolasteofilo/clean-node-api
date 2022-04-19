import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { EmailValidator, HttpRequest } from '../../protocols'
import { LoginController } from './login'

const makeEmail = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutType {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmail()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
}
describe('Login Controller', () => {
  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
