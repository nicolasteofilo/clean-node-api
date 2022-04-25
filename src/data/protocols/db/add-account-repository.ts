import { AddAccountModel } from '../../../domain/useCases/add-account'
import { AccountModel } from '../../useCases/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
