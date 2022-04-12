import { SingUpController } from '../../presentation/controllers/singup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/accout'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSingUpController = (): Controller => {
  const salt = 12

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const singUpController = new SingUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  return new LogControllerDecorator(singUpController)
}
