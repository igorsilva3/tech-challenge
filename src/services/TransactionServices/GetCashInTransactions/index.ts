import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetCashInTransactionsServiceDTO {
  where: {
    debitedAccountId: string
  },
  filter?: number
}

interface IGetCashInTransactionsService {
  execute(data: IGetCashInTransactionsServiceDTO): Promise<Transaction[]>
}

export class GetCashInTransactionsService implements IGetCashInTransactionsService {
  async execute(data: IGetCashInTransactionsServiceDTO): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        accountToTransactionsDebitedAccount: {
          user: {
            accountId: data.where.debitedAccountId
          }
        }
      },
      take: data.filter || 10
    })

    return transactions
  }
}
