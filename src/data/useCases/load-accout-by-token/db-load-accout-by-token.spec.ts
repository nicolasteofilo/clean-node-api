import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-accout-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return { sut, decrypterStub }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
