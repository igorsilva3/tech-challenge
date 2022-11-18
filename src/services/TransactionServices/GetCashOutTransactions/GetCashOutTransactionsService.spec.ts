import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { UserServices } from '@services/UserServices'
import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetCashOutTransactionsService } from '@services/TransactionServices/GetCashOutTransactions'

let id: string

let userOne: User
let userTwo: User

const createTransactionService = new CreateTransactionService()
const getCashOutTransactionsService = new GetCashOutTransactionsService()

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

  id = transaction.creditedAccountId
})

describe('Get Cash Out Transactions Service', () => {
  it('should to be able get a cash out transactions', async () => {
    const transactions = await getCashOutTransactionsService.execute({
      where: {
        creditedAccountId: id
      }
    })

    expect(transactions).toBeInstanceOf(Array)
    expect(transactions.length).toEqual(1)
  })
})
