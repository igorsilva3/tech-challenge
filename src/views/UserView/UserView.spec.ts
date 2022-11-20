import { faker } from '@faker-js/faker'
import { User, Account } from '@prisma/client'

import { UserView } from '@views/UserView'
import { CreateUserService } from '@services/UserServices/CreateUserService'

let user: User & { account: Account }

beforeAll(async () => {
  const createUserService = new CreateUserService()

  user = await createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    },
  })
})

describe('Test case: UserView', () => {
  it('should to be able render a user', async () => {
    const userView = new UserView()

    const view = userView.render(user)

    expect(view).toHaveProperty('id')
    expect(view).toHaveProperty('account')
    expect(view).toHaveProperty('createdAt')
    expect(view).toHaveProperty('updatedAt')

    expect(view).not.toHaveProperty('password')
    expect(view).not.toHaveProperty('accountId')
  })
})
