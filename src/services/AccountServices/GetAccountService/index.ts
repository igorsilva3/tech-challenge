import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetAccountServiceDTO {
  where: {
    id: string
  }
}

interface IGetAccountService {
  execute(data: IGetAccountServiceDTO): Promise<Account>
}

export class GetAccountService implements IGetAccountService {
  async execute(data: IGetAccountServiceDTO): Promise<Account> {
    const account = await prisma.account.findUniqueOrThrow({
      where: {
        id: data.where.id
      }
    })

    return account
  }
}
