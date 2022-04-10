import { SingUpController } from '../../presentation/controllers/singup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/accout'

export const makeSingUpController = (): SingUpController => {
  const salt = 12

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SingUpController(emailValidatorAdapter, dbAddAccount)
}
