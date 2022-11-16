import { faker } from '@faker-js/faker'
import { CreateUserService } from '@services/UserServices/CreateUserService'
import { UpdateUserService } from '@services/UserServices/UpdateUserService'

let id: string
let updatedAt: Date

const updateUserService = new UpdateUserService()

beforeAll(async () => {
  const createUserService = new CreateUserService()

  const user = await createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }
  })

  id = user.id
  updatedAt = user.updatedAt
})

describe('Update User Service',  () => {
  it('should to be able update a user', async () => {
    const user = await updateUserService.execute({
      id,
      data: {
        password: faker.internet.password(), // Update password
      }
    })

    expect(user).toHaveProperty('id')
    expect(user.updatedAt).not.toEqual(updatedAt)
  })
})