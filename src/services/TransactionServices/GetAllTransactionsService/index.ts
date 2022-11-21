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
      transactions.push(
        ...accountsToTransactionsCreditedAccount,
        ...accountsToTransactionsDebitedAccount,
      )
    }

    /* Checking if the user wants to get the transactionsCreditedAccount, if so, it will push the
    transactionsCreditedAccount to the transactions array. */
    if (data.select?.transactionsCreditedAccount) {
      transactions.push(...accountsToTransactionsCreditedAccount)
    }

    /* Checking if the user wants to get the transactionsDebitedAccount, if so, it will push the
    transactionsDebitedAccount to the transactions array. */
    if (data.select?.transactionsDebitedAccount) {
      transactions.push(...accountsToTransactionsDebitedAccount)
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

    if (data.select?.createdAt && data.select.transactionsCreditedAccount && data.select.transactionsDebitedAccount) {
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

      if(transactionCreditedFilteredByCreatedAt.length == 0 || transactionDebitedFilteredByCreatedAt.length == 0) {
        return []
      }

      return [
        ...transactionCreditedFilteredByCreatedAt,
        ...transactionDebitedFilteredByCreatedAt,
      ]
    }

    if(data.select?.createdAt && data.select.transactionsCreditedAccount) {
      console.log("entrou 1");
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

      return transactionCreditedFilteredByCreatedAt
    }

    if(data.select?.createdAt && data.select.transactionsDebitedAccount) {
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

      return transactionDebitedFilteredByCreatedAt
    }

    return transactions
  }
}
