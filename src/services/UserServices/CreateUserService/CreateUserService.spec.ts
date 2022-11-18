import { faker } from '@faker-js/faker'
import { CreateUserService } from '@services/UserServices/CreateUserService'
import { AccountServices } from '@services/AccountServices'

const createUserService = new CreateUserService()
const accountService = new AccountServices()

describe('Create User Service',  () => {
  it('should to be able create a user', async () => {
    const user = await createUserService.execute({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('accountId')
  })

  it('should to be able create a user with the account balance 50', async () => {
    const user = await createUserService.execute({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        account: {
          balance: 50
        }
      }
    })


    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('account')
    expect(Number(user.account.balance)).toEqual(50)
  })
})