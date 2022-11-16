import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { UserServices } from '@services/UserServices'
import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetTransactionService } from '@services/TransactionServices/GetTransactionService'

let id: string

let userOne: User
let userTwo: User

const createTransactionService = new CreateTransactionService()
const getTransactionService = new GetTransactionService()

beforeAll(async () => {
  const userServices = new UserServices()

  userOne = await userServices.createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
  })

  userTwo = await userServices.createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      account: {
        balance: 150.50
      }
    }
  })

  const transaction = await createTransactionService.execute({
    accounts: {
      debitedAccountId: userOne.accountId,
      creditedAccountId: userTwo.accountId
    },
    value: 50
  })

  id = transaction.id
})

describe('Get Transaction Service', () => {
  it('should to be able get a transaction by id', async () => {
    const transaction = await getTransactionService.execute({
      where: {
        id
      }
    })

    expect(transaction).toHaveProperty('id')
    expect(transaction).toHaveProperty('createdAt')
  })
})
