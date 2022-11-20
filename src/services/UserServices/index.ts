import { CreateUserService } from '@services/UserServices/CreateUserService'
import { GetUserService } from '@services/UserServices/GetUserService'

interface IUserServices {
  createUserService: CreateUserService
  getUserService: GetUserService
}

export class UserServices implements IUserServices {
  createUserService: CreateUserService
  getUserService: GetUserService

  constructor () {
    this.createUserService = new CreateUserService()
    this.getUserService = new GetUserService()
  }
}
