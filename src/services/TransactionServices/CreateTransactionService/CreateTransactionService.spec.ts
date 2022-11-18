import { User, Account } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { UserServices } from '@services/UserServices'
import { AccountServices } from '@services/AccountServices'
import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'

let userOne: User
let userTwo: User

let accountUserOne: Account
let accountUserTwo: Account

const createTransactionService = new CreateTransactionService()
const accountServices = new AccountServices()

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

  if (userOne && userTwo) {
    accountUserOne = await accountServices.getAccountService.execute({
      where: {
        id: userOne.accountId,
      },
    })

    accountUserTwo = await accountServices.getAccountService.execute({
      where: {
        id: userTwo.accountId,
      },
    })
  }
})

describe('Create Transaction Service', () => {
  it('should to be able create a transaction in between two users', async () => {
    /* Creating a transaction between two users. */
    const transaction = await createTransactionService.execute({
      accounts: {
        debitedAccountId: userOne.accountId,
        creditedAccountId: userTwo.accountId,
      },
      value: 50,
    })

    const accountUserOneAfter = await accountServices.getAccountService.execute(
      {
        where: {
          id: userOne.accountId,
        },
      },
    )

    const accountUserTwoAfter = await accountServices.getAccountService.execute(
      {
        where: {
          id: userTwo.accountId,
        },
      },
    )

    /* Checking if the transaction has the properties id and createdAt. */
    expect(transaction).toHaveProperty('id')
    expect(transaction).toHaveProperty('createdAt')

    /* Checking if the value of the transaction is equal to 50. */
    expect(Number(transaction.value)).toEqual(50)

    /* Checking if the transaction has the properties debitedAccountId and creditedAccountId. */
    expect(transaction.debitedAccountId).toEqual(userOne.accountId)
    expect(transaction.creditedAccountId).toEqual(userTwo.accountId)

    /* Checking if the balance of the userOne and userTwo are different from the balance after the
    transaction. */
    expect(Number(accountUserOneAfter.balance)).not.toEqual(
      accountUserOne.balance,
    )
    expect(Number(accountUserTwoAfter.balance)).not.toEqual(
      accountUserTwo.balance,
    )

    expect(Number(accountUserOneAfter.balance)).toEqual(
      Number(accountUserOne.balance) - Number(transaction.value),
    )
    expect(Number(accountUserTwoAfter.balance)).toEqual(
      Number(accountUserTwo.balance) + Number(transaction.value),
    )
  })

  it('not should to be able create a transaction in between two users with balance larger the user account balance', () => {
    /* Creating a transaction between two users. */
    createTransactionService
      .execute({
        accounts: {
          debitedAccountId: userOne.accountId,
          creditedAccountId: userTwo.accountId,
        },
        value: Number(accountUserOne.balance) * 2,
      })
      .catch((error) => {
        /* Checking if the error is equal to 'Do not have enough balance'. */
        expect(error.message).toBe('Do not have enough balance')
      })
  })

  it('not should to be able create a transaction in between two users with balance smaller the user account balance', () => {
    /* Creating a transaction between two users. */
    createTransactionService
      .execute({
        accounts: {
          debitedAccountId: userOne.accountId,
          creditedAccountId: userTwo.accountId,
        },
        value: -30,
      })
      .catch((error) => {
        /* Checking if the message error is equal to 'Do not have enough balance'. */
        expect(error.message).toBe('Unauthorized transaction amount')
      })
  })
})
