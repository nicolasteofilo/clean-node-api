import { InvalidParamError, MissingParamError } from '../../errors'
import { CompareFieldValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'other_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any', fieldToCompare: 'any' })
    expect(error).toBeFalsy()
  })
})
