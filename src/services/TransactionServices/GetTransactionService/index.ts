import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetTransactionServiceDTO {
  where: {
    id: string
  }
}

interface IGetTransactionService {
  execute(data: IGetTransactionServiceDTO): Promise<Transaction | Transaction[]>
}

export class GetTransactionService implements IGetTransactionService {
  async execute(data: IGetTransactionServiceDTO): Promise<Transaction | Transaction[]> {
    const transaction = await prisma.transaction.findMany({
      where: {
        id: data.where.id,
      },
    })

    return transaction
  }
}
