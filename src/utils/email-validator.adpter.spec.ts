import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adpter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })
})
