import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetAllTransactionsServiceDTO {
  where: {
    accountId: string
  }
  select?: {
    transactionsCreditedAccount?: boolean
    transactionsDebitedAccount?: boolean
    createdAt?: Date
  }
  filter?: number
}

interface IGetAllTransactionsService {
  execute(data: IGetAllTransactionsServiceDTO): Promise<Transaction[]>
}

export class GetAllTransactionsService implements IGetAllTransactionsService {
  async execute(data: IGetAllTransactionsServiceDTO): Promise<Transaction[]> {
    /* Getting the transactions cash-in and cash-out of user account */
    const transactions: Transaction[] = []

    const [
      {
        accountsToTransactionsCreditedAccount,
        accountsToTransactionsDebitedAccount,
      },
    ] = await prisma.account.findMany({
      where: {
        user: {
          accountId: data.where.accountId,
        },
      },
      include: {
        accountsToTransactionsCreditedAccount: true,
        accountsToTransactionsDebitedAccount: true,
      },
      take: data.filter || 10,
    })

    /* It's checking if the user didn't select any option, if so, it will get all the transactions. */
    if (
      !data.select?.transactionsCreditedAccount &&
      !data.select?.transactionsDebitedAccount &&
      !data.select?.createdAt
    ) {
      const transactionsCreditedAccount = accountsToTransactionsCreditedAccount.filter(
        (transaction) => {
          if (transaction.creditedAccountId == data.where.accountId)
            return transaction
        },
      )

      const transactionsDebitedAccount = accountsToTransactionsDebitedAccount.filter(
        (transaction) => {
          if (transaction.debitedAccountId == data.where.accountId)
            return transaction
        },
      )

      transactions.push(...transactionsCreditedAccount)
      transactions.push(...transactionsDebitedAccount)
    }

    /* Checking if the user wants to get the transactionsCreditedAccount, if so, it will push the
    transactionsCreditedAccount to the transactions array. */
    if (data.select?.transactionsCreditedAccount) {
      /* It's filtering the transactionsCreditedAccount by the accountId. */
      const transactionCredited = accountsToTransactionsCreditedAccount.filter(
        (transaction) => {
          if (transaction.creditedAccountId == data.where.accountId)
            return transaction
        },
      )

      transactions.push(...transactionCredited)
    }

    /* Checking if the user wants to get the transactionsDebitedAccount, if so, it will push the
    transactionsDebitedAccount to the transactions array. */
    if (data.select?.transactionsDebitedAccount) {
      const transactionDebited = accountsToTransactionsDebitedAccount.filter(
        (transaction) => {
          if (transaction.debitedAccountId == data.where.accountId)
            return transaction
        },
      )

      transactions.push(...transactionDebited)
    }

    /* It's filtering the transactions by createdAt. */
    if (data.select?.createdAt) {
      const transactionCreditedFilteredByCreatedAt = accountsToTransactionsCreditedAccount.filter(
        (transaction) => {
          /* It's getting the date of the transaction and the date that the user selected. */
          const transactionDate = transaction.createdAt
            .toISOString()
            .slice(0, 10)
          const selectDate = data.select?.createdAt?.toISOString().slice(0, 10)

          if (transactionDate == selectDate) {
            return transaction
          }
        },
      )

      const transactionDebitedFilteredByCreatedAt = accountsToTransactionsDebitedAccount.filter(
        (transaction) => {
          /* It's getting the date of the transaction and the date that the user selected. */
          const transactionDate = transaction.createdAt
            .toISOString()
            .slice(0, 10)
          const selectDate = data.select?.createdAt?.toISOString().slice(0, 10)

          if (transactionDate == selectDate) {
            return transaction
          }
        },
      )

      transactions.push(...transactionCreditedFilteredByCreatedAt)
      transactions.push(...transactionDebitedFilteredByCreatedAt)
    }

    return transactions
  }
}
