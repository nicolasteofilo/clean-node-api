import bcrypt from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('any_hash'))
  },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(12)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')

    expect(hash).toBe('any_hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())) as any)
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
