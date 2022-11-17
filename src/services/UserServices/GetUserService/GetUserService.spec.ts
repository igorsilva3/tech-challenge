import { faker } from '@faker-js/faker'

import { CreateUserService } from '@services/UserServices/CreateUserService'
import { GetUserService } from '@services/UserServices/GetUserService'


let id: string
let username: string

const getUserService = new GetUserService()

beforeAll(async () => {
  const createUserService = new CreateUserService()

  const user = await createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }
  })

  id = user.id
  username = user.username
})

describe('Get User Service',  () => {
  it('should to be able get a user by id', async () => {
    const user = await getUserService.execute({
      where: {
        id
      }
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('accountId')
  })

  it('should to be able get a user by username', async () => {
    const user = await getUserService.execute({
      where: {
        username
      }
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('accountId')
  })
})