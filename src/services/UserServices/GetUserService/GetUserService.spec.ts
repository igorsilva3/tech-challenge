import { faker } from '@faker-js/faker'

import { CreateUserService } from '@services/UserServices/CreateUserService'
import { GetUserService } from '@services/UserServices/GetUserService'


let id: string

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
})