import { CreateUserService } from '@services/UserServices/CreateUserService'
import { GetUserService } from '@services/UserServices/GetUserService'
import { UpdateUserService } from '@services/UserServices/UpdateUserService'
import { DeleteUserService } from '@services/UserServices/DeleteUserService'

interface IUserServices {
  createUserService: CreateUserService
  getUserService: GetUserService
  updateUserService: UpdateUserService
  deleteUserService: DeleteUserService
}

export class UserServices implements IUserServices {
  createUserService: CreateUserService
  getUserService: GetUserService
  updateUserService: UpdateUserService
  deleteUserService: DeleteUserService

  constructor () {
    this.createUserService = new CreateUserService()
    this.getUserService = new GetUserService()
    this.updateUserService = new UpdateUserService()
    this.deleteUserService = new DeleteUserService()
  }
}
