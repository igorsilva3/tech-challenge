import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetCashOutTransactionsServiceDTO {
  where: {
    creditedAccountId: string
  },
  filter?: number
}

interface IGetCashOutTransactionsService {
  execute(data: IGetCashOutTransactionsServiceDTO): Promise<Transaction[]>
}

export class GetCashOutTransactionsService implements IGetCashOutTransactionsService {
  async execute(data: IGetCashOutTransactionsServiceDTO): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        accountToTransactionsCreditedAccount: {
          user: {
            accountId: data.where.creditedAccountId
          }
        },
      },
      take: data.filter || 10
    })

    return transactions
  }
}
