import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetAccountServiceDTO {
  where: {
    id: string
  }
}

interface ICreateAccountService {
  execute(data: IGetAccountServiceDTO): Promise<Account | null>
}

export class GetAccountService implements ICreateAccountService {
  async execute(data: IGetAccountServiceDTO): Promise<Account | null> {
    const account = await prisma.account.findUnique({
      where: {
        id: data.where.id
      }
    })

    return account
  }
}
