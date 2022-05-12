import { LoadAccountByToken } from '../../../domain/useCases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import {
  AccountModel,
  LoadAccountByTokenRepository,
} from '../authentication/db-authentication-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepositoryStub.loadByToken(accessToken, role)
    }
    return new Promise((resolve) => resolve(null))
  }
}
