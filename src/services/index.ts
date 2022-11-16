import { CreateAccountService } from '@services/AccountServices/CreateAccountService'
import { GetAccountService } from '@services/AccountServices/GetAccountService'
import { UpdateAccountService } from '@services/AccountServices/UpdateAccountService'
import { DeleteAccountService } from '@services/AccountServices/DeleteAccountService'

interface IAccountServices {
  createAccountService: CreateAccountService
  getAccountService: GetAccountService
  updateAccountService: UpdateAccountService
  deleteAccountService: DeleteAccountService
}

export class AccountServices implements IAccountServices {
  createAccountService: CreateAccountService
  getAccountService: GetAccountService
  updateAccountService: UpdateAccountService
  deleteAccountService: DeleteAccountService
}
