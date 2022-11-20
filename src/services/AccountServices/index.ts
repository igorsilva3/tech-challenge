import { CreateAccountService } from '@services/AccountServices/CreateAccountService'
import { GetAccountService } from '@services/AccountServices/GetAccountService'
import { UpdateAccountService } from '@services/AccountServices/UpdateAccountService'

interface IAccountServices {
  createAccountService: CreateAccountService
  getAccountService: GetAccountService
  updateAccountService: UpdateAccountService
}

export class AccountServices implements IAccountServices {
  createAccountService: CreateAccountService
  getAccountService: GetAccountService
  updateAccountService: UpdateAccountService

  constructor () {
    this.createAccountService = new CreateAccountService()
    this.getAccountService = new GetAccountService()
    this.updateAccountService = new UpdateAccountService()
  }
}
