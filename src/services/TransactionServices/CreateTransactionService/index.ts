import { PrismaClient, Transaction } from '@prisma/client'

import { AccountServices } from '@services/AccountServices'

const prisma = new PrismaClient()
const accountService = new AccountServices()

interface ICreateTransactionServiceDTO {
  accounts: {
    debitedAccountId: string
    creditedAccountId: string
  }
  value: number
}

interface ICreateTransactionService {
  execute(data: ICreateTransactionServiceDTO): Promise<Transaction>
}

export class CreateTransactionService implements ICreateTransactionService {
  async execute(data: ICreateTransactionServiceDTO): Promise<Transaction> {
    const debitedAccount = await accountService.getAccountService.execute({
      where: {
        id: data.accounts.debitedAccountId,
      },
    })

    if(data.value < 0) {
      throw 'Unauthorized transaction amount'
    }

    if (Number(debitedAccount.balance) < data.value) {
      throw 'Do not have enough balance'
    }

    const creditedAccount = await accountService.getAccountService.execute({
      where: {
        id: data.accounts.creditedAccountId,
      },
    })


    /* Updating the balance of the debited account. */
    await accountService.updateAccountService.execute({
      id: debitedAccount.id,
      data: {
        balance: Number(debitedAccount.balance) - data.value
      }
    })

    /* Updating the balance of the credited account. */
    await accountService.updateAccountService.execute({
      id: creditedAccount.id,
      data: {
        balance: Number(creditedAccount.balance) + data.value
      }
    })

    const transaction = await prisma.transaction.create({
      data: {
        debitedAccountId: data.accounts.debitedAccountId,
        creditedAccountId: data.accounts.creditedAccountId,
        value: data.value,
      },
    })

    return transaction
  }
}
