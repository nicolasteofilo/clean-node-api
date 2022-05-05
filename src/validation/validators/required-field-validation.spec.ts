import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  const fieldName = 'field'
  return new RequiredFieldValidation(fieldName)
}

describe('RequiresField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ name: 'any' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any' })
    expect(error).toBeFalsy()
  })
})
