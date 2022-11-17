import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetTransactionServiceDTO {
  where: {
    id: string
  }
}

interface IGetTransactionService {
  execute(data: IGetTransactionServiceDTO): Promise<Transaction>
}

export class GetTransactionService implements IGetTransactionService {
  async execute(data: IGetTransactionServiceDTO): Promise<Transaction> {
    const transaction = await prisma.transaction.findUniqueOrThrow({
      where: {
        id: data.where.id,
      },
    })

    return transaction
  }
}
