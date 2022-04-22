import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiresField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ name: 'any' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation success', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ field: 'any' })
    expect(error).toBeFalsy()
  })
})
