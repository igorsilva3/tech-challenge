import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { UserServices } from '@services/UserServices'
import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetAllTransactionsService } from '@services/TransactionServices/GetAllTransactionsService'

let userOne: User
let userTwo: User

const createTransactionService = new CreateTransactionService()
const getAllTransactionsService = new GetAllTransactionsService()

beforeAll(async () => {
  const userServices = new UserServices()

  userOne = await userServices.createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
  })

  userTwo = await userServices.createUserService.execute({
    data: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      account: {
        balance: 150.5,
      },
    },
  })

  await createTransactionService.execute({
    accounts: {
      debitedAccountId: userOne.accountId,
      creditedAccountId: userTwo.accountId,
    },
    value: 50,
  })

  await createTransactionService.execute({
    accounts: {
      debitedAccountId: userTwo.accountId,
      creditedAccountId: userOne.accountId,
    },
    value: 22.5,
  })
})

describe('Get All Transactions Service', () => {
  it('should to be able get all transactions', async () => {
    const transactions = await getAllTransactionsService.execute({
      where: {
        accountId: userOne.accountId,
      },
    })

    expect(transactions).toBeInstanceOf(Array)
    expect(transactions.length > 0).toBe(true)
    expect(transactions[0]).toHaveProperty('createdAt')
  })

  it('should to be able get all transactions filtered by cash-out ', async () => {
    const transactions = await getAllTransactionsService.execute({
      where: {
        accountId: userOne.accountId,
      },
      select: {
        transactionsDebitedAccount: true,
      },
    })

    expect(transactions).toBeInstanceOf(Array)
    expect(transactions.length > 0).toBe(true)
    expect(transactions[0]).toHaveProperty('createdAt')
    expect(transactions[0].debitedAccountId).toEqual(userOne.accountId)
  })

  it('should to be able get all transactions filtered by cash-in ', async () => {
    const transactions = await getAllTransactionsService.execute({
      where: {
        accountId: userOne.accountId,
      },
      select: {
        transactionsCreditedAccount: true,
      },
    })

    expect(transactions).toBeInstanceOf(Array)
    expect(transactions.length > 0).toBe(true)
    expect(transactions[0]).toHaveProperty('createdAt')
    expect(transactions[0].creditedAccountId).toEqual(userOne.accountId)
  })

  it('should to be able get all transactions filtered by created at ', async () => {
    const date = new Date()

    const transactions = await getAllTransactionsService.execute({
      where: {
        accountId: userOne.accountId,
      },
      select: {
        createdAt: date,
      },
    })

    const transactionDate = transactions[0].createdAt.toISOString().slice(0, 10)
    const selectDate = date.toISOString().slice(0, 10)

    expect(transactions).toBeInstanceOf(Array)
    expect(transactions.length > 0).toBe(true)
    expect(transactions[0]).toHaveProperty('createdAt')
    expect(transactionDate).toEqual(selectDate)
  })
})
