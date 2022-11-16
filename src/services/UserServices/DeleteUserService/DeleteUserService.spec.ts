import { faker } from '@faker-js/faker'
import { CreateUserService } from '@services/UserServices/CreateUserService'
import { DeleteUserService } from '@services/UserServices/DeleteUserService'

let id: string

const createUserService = new CreateUserService()
const deleteUserService = new DeleteUserService()

beforeAll(async () => {
  const user = await createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
  })

  id = user.id
})

describe('Delete User Service',  () => {
  it('should to be able delete a user', async () => {
    const user = await deleteUserService.execute({
      where: {
        id
      }
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('accountId')
  })
})