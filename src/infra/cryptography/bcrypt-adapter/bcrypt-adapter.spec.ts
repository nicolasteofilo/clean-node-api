import bcrypt from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('any_hash'))
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(12)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')

      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')

      expect(hash).toBe('any_hash')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest
        .spyOn(bcrypt, 'hash')
        .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())) as any)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')

      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return a true on compare success', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')

      expect(isValid).toBe(true)
    })

    test('Should return a false on compare fails', async () => {
      const sut = makeSut()
      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(new Promise((resolve) => resolve(false)) as any)
      const fails = await sut.compare('any_value', 'any_hash')
      expect(fails).toBe(false)
    })

    test('Should throws if compare throws', async () => {
      const sut = makeSut()
      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())) as any)
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
